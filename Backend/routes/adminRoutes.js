const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  isAdmin
} = require("../middleware/adminMiddleware");

const {
  getAllUsers,
  deleteUser,
  getAllBlogs,
  approveBlog,
  deleteBlog,
  getReports,
} = require("../controllers/adminController");

// 🔒 All routes below are protected for ADMIN only
router.use(protect);
router.use(isAdmin);

/**
 * USERS MANAGEMENT
 */
router.get("/users", getAllUsers);       // List all users
router.delete("/users/:id", deleteUser); // Delete a user by ID

/**
 * BLOG MANAGEMENT
 */
router.get("/blogs", getAllBlogs);            // List all blogs (any status)
router.put("/blogs/:id/approve", approveBlog); // Approve blog (publish)
router.delete("/blogs/:id", deleteBlog);       // Delete blog

/**
 * REPORTS MANAGEMENT
 */
router.get("/reports", getReports);           // List all reports

module.exports = router;