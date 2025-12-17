import mongoose from "mongoose";

export const connectDB = async () => {
  const uri =
    process.env.MONGODB_URI ||
    "mongodb+srv://seenusharma2022_db_user:m7AzQs8Bw6PSid7f@cluster0.loegxm4.mongodb.net/bolsaathi?appName=Cluster0&retryWrites=true&w=majority";

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log("✅ MongoDB connected successfully");
    console.log(`📊 Database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    
    if (err.message.includes("whitelist") || err.message.includes("IP")) {
      console.error("\n🔒 IP WHITELIST ISSUE:");
      console.error("Your IP address is not whitelisted in MongoDB Atlas.");
      console.error("\n📝 To fix this:");
      console.error("1. Go to: https://cloud.mongodb.com/");
      console.error("2. Navigate to: Network Access → Add IP Address");
      console.error("3. Click 'Add Current IP Address' or add '0.0.0.0/0' (allows all IPs - for development only)");
      console.error("4. Wait 1-2 minutes for changes to take effect");
      console.error("5. Restart your backend server\n");
    }
    
    throw err;
  }
};


