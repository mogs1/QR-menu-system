const QRCode = require('qrcode');

// Generate QR Code for Menu
const generateQRCode = async (req, res) => {
  try {
    const baseUrl = "http://localhost:3000/menu"; // Frontend menu page URL
    const qrCodeData = await QRCode.toDataURL(baseUrl);

    res.status(200).json({ qrCode: qrCodeData });
  } catch (error) {
    res.status(500).json({ message: 'Error generating QR Code', error });
  }
};

module.exports = {
  generateQRCode, // Export the QR Code generator
};
