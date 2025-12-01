async function getMe(req, res) {
  try {
    return res.json({ id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function updateMe(req, res) {
  try {
    const { name, email } = req.body;
    if (name) req.user.name = name;
    if (email) req.user.email = email;
    await req.user.save();
    return res.json({ id: req.user.id, name: req.user.name, email: req.user.email, role: req.user.role });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { getMe, updateMe };


