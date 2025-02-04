// import React, { useState, useEffect } from "react";

// const SettingsModal = ({
//   user,
//   setUser,
//   handleUpdateProfile,
//   setShowSettingsModal,
// }) => {
//   const [selectedProfileIcon, setSelectedProfileIcon] = useState(
//     user.profileIcon
//   );
//   const [isSaving, setIsSaving] = useState(false); // Loading state for the Save button

//   const profilePictures = [
//     "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=1674&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1635&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1625859043880-56acbcb6a6ac?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://images.unsplash.com/photo-1560809451-9e77c2e8214a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     "https://plus.unsplash.com/premium_photo-1674275698987-3bf078858747?q=80&w=1636&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   ];

//   const handleSave = async () => {
//     setIsSaving(true); // Start loading
//     const updatedUser = { ...user, profileIcon: selectedProfileIcon };
//     await handleUpdateProfile(updatedUser); // Update the backend
//     setIsSaving(false); // Stop loading
//     setShowSettingsModal(false); // Close the modal
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
//       <div className="bg-white rounded-lg p-6 w-96">
//         <h2 className="text-xl font-bold mb-4 text-center">Settings</h2>

//         {/* Profile Picture Display */}
//         <div className="flex justify-center mb-6">
//           <img
//             src={selectedProfileIcon}
//             alt="Profile"
//             className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
//           />
//         </div>

//         {/* Name Field */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Name</label>
//           <input
//             type="text"
//             value={user.name}
//             onChange={(e) => setUser({ ...user, name: e.target.value })}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//           />
//         </div>

//         {/* Email Field (Read-Only) */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Email</label>
//           <input
//             type="email"
//             value={user.email}
//             readOnly
//             className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
//           />
//         </div>

//         {/* Profile Icon Selection */}
//         <div className="mb-4">
//           <label className="block text-gray-700 mb-2">Profile Icon</label>
//           <div className="flex gap-2 flex-wrap">
//             {profilePictures.map((icon, index) => (
//               <button
//                 key={index}
//                 onClick={() => setSelectedProfileIcon(icon)}
//                 className={`w-12 h-12 rounded-full overflow-hidden ${
//                   selectedProfileIcon === icon
//                     ? "border-2 border-indigo-500"
//                     : "border border-gray-300"
//                 }`}
//               >
//                 <img
//                   src={icon}
//                   alt={`Profile ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Save and Cancel Buttons */}
//         <div className="flex justify-end gap-2">
//           <button
//             onClick={() => setShowSettingsModal(false)}
//             className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={isSaving}
//             className="px-4 py-2 bg-gradient-to-br from-purple-600 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-purple-500 flex items-center justify-center"
//           >
//             {isSaving ? (
//               <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//             ) : (
//               "Save"
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SettingsModal;
