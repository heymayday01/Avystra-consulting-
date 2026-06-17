import express from 'express';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import Lead from '../models/Lead.js';

const router = express.Router();

// Helper to sanitize input and prevent basic script exploits (XSS)
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\$|\./g, ''); // Basic NoSQL character shielding
}

router.post('/submit', async (req, res) => {
  try {
    const { name, email, company, orgSize, stage, whatsNotWorking } = req.body;

    // Check required fields
    if (!name || !email || !company || !orgSize || !stage || !whatsNotWorking) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Sanitize inputs
    const sanitizedLead = {
      name: sanitizeInput(name),
      email: sanitizeInput(email).toLowerCase().trim(),
      company: sanitizeInput(company),
      orgSize: sanitizeInput(orgSize),
      stage: sanitizeInput(stage),
      whatsNotWorking: sanitizeInput(whatsNotWorking),
    };

    let savedDb = false;

    // Detect if MongoDB is currently connected
    const isMongoConnected = mongoose.connection && mongoose.connection.readyState === 1;

    if (isMongoConnected) {
      try {
        const lead = new Lead(sanitizedLead);
        await lead.save();
        savedDb = true;
        console.log(`[Database] Lead saved to MongoDB for: ${sanitizedLead.email}`);
      } catch (mongoErr) {
        console.error('[Database Error] MongoDB save failed, routing to local file:', mongoErr.message);
      }
    } else {
      console.log('[Database] MongoDB not connected, saving to persistent local backup.');
    }

    // Capture to a robust backup JSON file in the filesystem so submission and queries are fully functional
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const backupPath = path.join(dataDir, 'leads.json');
    let leads = [];
    if (fs.existsSync(backupPath)) {
      try {
        const content = fs.readFileSync(backupPath, 'utf8');
        leads = JSON.parse(content);
      } catch (e) {
        leads = [];
      }
    }

    const backupEntry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...sanitizedLead,
      createdAt: new Date().toISOString()
    };

    leads.push(backupEntry);
    fs.writeFileSync(backupPath, JSON.stringify(leads, null, 2), 'utf8');

    return res.status(200).json({
      success: true,
      message: 'Consultation request submitted successfully.',
      lead: backupEntry,
      savedDb
    });
  } catch (error) {
    console.error('[Lead Route Error]:', error);
    return res.status(500).json({ error: 'Internal system error occurred.' });
  }
});

// Helper endpoint to check submitted leads in dev mode
router.get('/list', (req, res) => {
  try {
    const backupPath = path.join(process.cwd(), 'data', 'leads.json');
    if (fs.existsSync(backupPath)) {
      const content = fs.readFileSync(backupPath, 'utf8');
      return res.status(200).json(JSON.parse(content));
    }
    return res.status(200).json([]);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve backup list' });
  }
});

export default router;
