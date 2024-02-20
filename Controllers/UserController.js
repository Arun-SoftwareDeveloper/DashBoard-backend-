const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer"); // Import nodemailer if needed
const User = require("../Models/UserForm");

// Define the secret key for JWT token
const secretKey = "arunramasamy46"; // Should be securely stored, not hard-coded

// Function to generate JWT token
function generateToken(user) {
  // Create a JWT token with user information
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    secretKey, // Secret key to sign the token
    { expiresIn: "1h" } // Token expiration time
  );

  return token;
}

// Controller function to register a new user
async function registerUser(req, res) {
  try {
    const { firstName, lastName, email, password, phoneNumber, dateOfBirth } =
      req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("User already exists with email:", email);
      return res.status(409).send({ message: "User already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      dateOfBirth,
      active: true, // Set user as active by default
    });

    // Save the new user to the database
    await newUser.save();

    // Return a success message
    return res.status(201).send({ message: "User Registered Successfully" });
  } catch (error) {
    console.error("Error Occurred: " + error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Controller function to log in a user
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const existingUser = await User.findOne({ email });

    // If user not found, return error
    if (!existingUser) {
      console.log("Unregistered User");
      return res.status(404).send({ message: "User not found" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, existingUser.password);

    // If passwords don't match, return error
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).send({ message: "Incorrect password" });
    }

    // Generate JWT token for the user
    const token = generateToken(existingUser);

    // Return success message with token
    return res.status(200).send({ message: "User Logged Successfully", token });
  } catch (error) {
    console.error("Error Occurred" + " " + error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

// Controller function to handle forgot password request
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, return error
    if (!user) {
      console.log("Not a user");
      return res.status(404).send({ message: "User not found" });
    }

    // Generate a random token
    const token = Math.random().toString(36).slice(-8);

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "arunramasamy46@gmail.com",
        pass: "pruxtxnekznczdpc",
      },
    });

    // Compose email message
    const mailOptions = {
      from: "arunramasamy46@gmail.com", // Replace with your Gmail email
      to: user.email,
      subject: "Reset Your Password",
      html: `
        <h1>Hello ${user.firstName},</h1>
        <p>We noticed that you requested to reset your password.</p>
        <p>Don't worry! Click the link below to securely reset your password:</p>
        <p>Reset Token: ${token}</p>
        <a href="https://example.com/resetPassword">Reset Your Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
      `,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .json({ error: "Failed to send reset password email" });
      }
      console.log("Email sent: " + info.response);
      return res.status(200).json({ message: "Reset password email sent" });
    });
  } catch (error) {
    console.error("Error Occurred" + " " + error);
    return res.status(501).send({ message: "Internal Server Error" });
  }
}

// Controller function to handle password reset
async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;

    // Find the user by token
    const user = await User.findOne({ passwordResetToken: token });

    // If user not found, return error
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and reset token
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.active = true; // Set user as active after password reset
    await user.save();

    // Return success message
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
}

// Controller function to get all users
async function getUsers(req, res) {
  try {
    // Retrieve all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to edit a user
async function editUser(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the user by ID and update the data
    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    // If user not found, return error
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the updated user data
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// Controller function to delete a user
async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    // Find the user by ID and delete it
    const deletedUser = await User.findByIdAndDelete(id);

    // If user not found, return error
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return success message
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUsers,
  editUser,
  deleteUser,
};
