import React, { useState, useRef } from 'react';
import { User as UserType } from '../App';
import { User, Phone, MapPin, Users, Award, MessageSquare, BarChart, Camera, Upload, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface UserProfileProps {
  user: UserType;
  language: 'en' | 'sw';
}

export function UserProfile({ user, language }: UserProfileProps) {
  const [profilePicture, setProfilePicture] = useState<string | null>(user.profilePicture || null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const translations = {
    en: {
      profile: 'My Profile',
      personalInfo: 'Personal Information',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      role: 'Role',
      cooperative: 'Cooperative',
      region: 'Region',
      language: 'Language',
      statistics: 'My Contributions',
      messagesPosted: 'Messages Posted',
      votesParticipated: 'Votes Participated',
      discussionsStarted: 'Discussions Started',
      farmer: 'Individual Farmer',
      leader: 'Cooperative Leader',
      expert: 'Agricultural Expert',
      english: 'English',
      swahili: 'Kiswahili',
      memberSince: 'Member Since',
      changePhoto: 'Change Photo',
      uploadPhoto: 'Upload Photo',
      removePhoto: 'Remove Photo',
      cancel: 'Cancel',
      choosePhoto: 'Choose a Photo',
      dragDrop: 'Drag and drop or click to upload',
      supportedFormats: 'Supported formats: JPG, PNG, GIF (max 5MB)',
    },
    sw: {
      profile: 'Wasifu Wangu',
      personalInfo: 'Taarifa Binafsi',
      fullName: 'Jina Kamili',
      phoneNumber: 'Nambari ya Simu',
      role: 'Jukumu',
      cooperative: 'Ushirika',
      region: 'Mkoa',
      language: 'Lugha',
      statistics: 'Michango Yangu',
      messagesPosted: 'Ujumbe Uliotumwa',
      votesParticipated: 'Kura Zilizoshirikiwa',
      discussionsStarted: 'Mijadala Iliyoanzishwa',
      farmer: 'Mkulima Binafsi',
      leader: 'Kiongozi wa Ushirika',
      expert: 'Mtaalamu wa Kilimo',
      english: 'English',
      swahili: 'Kiswahili',
      memberSince: 'Mwanachama Tangu',
      changePhoto: 'Badilisha Picha',
      uploadPhoto: 'Pakia Picha',
      removePhoto: 'Ondoa Picha',
      cancel: 'Ghairi',
      choosePhoto: 'Chagua Picha',
      dragDrop: 'Buruta na dondosha au bofya kupakia',
      supportedFormats: 'Muundo unaotumika: JPG, PNG, GIF (max 5MB)',
    },
  };

  const t = translations[language];

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'en' ? 'File size must be less than 5MB' : 'Ukubwa wa faili lazima uwe chini ya 5MB');
        return;
      }

      // Check file type
      if (!file.type.match(/image\/(jpg|jpeg|png|gif)/)) {
        alert(language === 'en' ? 'Please upload a valid image file' : 'Tafadhali pakia faili halali la picha');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
        setShowUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePicture(null);
    setShowUploadModal(false);
  };

  const getRoleLabel = () => {
    if (user.role === 'farmer') return t.farmer;
    if (user.role === 'leader') return t.leader;
    return t.expert;
  };

  const getLanguageLabel = () => {
    return user.language === 'en' ? t.english : t.swahili;
  };

  const stats = [
    {
      icon: MessageSquare,
      label: t.messagesPosted,
      value: 42,
      color: 'bg-blue-500',
    },
    {
      icon: BarChart,
      label: t.votesParticipated,
      value: 15,
      color: 'bg-green-500',
    },
    {
      icon: Award,
      label: t.discussionsStarted,
      value: 8,
      color: 'bg-yellow-500',
    },
  ];

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user.name);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [newCooperative, setNewCooperative] = useState(user.cooperative);
  const [newRegion, setNewRegion] = useState(user.region);
  const [newLanguage, setNewLanguage] = useState(user.language);
  const [newRole, setNewRole] = useState(user.role);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setNewImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Here you would typically send the updated data to the server
    console.log('Saving changes:', {
      name: newName,
      phone: newPhone,
      cooperative: newCooperative,
      region: newRegion,
      language: newLanguage,
      role: newRole,
      image: newImage,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setNewName(user.name);
    setNewPhone(user.phone);
    setNewCooperative(user.cooperative);
    setNewRegion(user.region);
    setNewLanguage(user.language);
    setNewRole(user.role);
    setNewImage(null);
    setImageUrl(null);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header with Profile Picture */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#2D5016] to-[#3D6B1F] rounded-xl shadow-lg p-8 mb-6 text-white"
      >
        <div className="flex items-center gap-6">
          {/* Profile Picture */}
          <div className="relative group">
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
              {profilePicture ? (
                <img 
                  src={profilePicture} 
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-16 h-16 text-[#2D5016]" />
              )}
            </div>
            
            {/* Edit Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              className="absolute bottom-0 right-0 w-10 h-10 bg-[#5A8A00] hover:bg-[#6BA300] rounded-full flex items-center justify-center shadow-lg transition-all group-hover:scale-110"
            >
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
            <p className="text-white/90 text-lg">{getRoleLabel()}</p>
            <p className="text-sm text-white/75 mt-2">
              {t.memberSince} {new Date().toLocaleDateString(language === 'en' ? 'en-KE' : 'sw-KE')}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Upload Photo Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#2D5016]">{t.choosePhoto}</h3>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* File Input Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#8B6F47] rounded-xl p-8 text-center cursor-pointer hover:bg-[#F5F1E8] transition-all mb-4"
              >
                <Upload className="w-12 h-12 text-[#8B6F47] mx-auto mb-3" />
                <p className="text-[#2D5016] font-medium mb-2">{t.dragDrop}</p>
                <p className="text-sm text-[#8B6F47]">{t.supportedFormats}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Current Preview */}
              {profilePicture && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#8B6F47] mb-2">
                    {language === 'en' ? 'Current Photo:' : 'Picha ya Sasa:'}
                  </p>
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#2D5016]">
                    <img 
                      src={profilePicture} 
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                {profilePicture && (
                  <button
                    onClick={handleRemovePhoto}
                    className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <X className="w-5 h-5" />
                    {t.removePhoto}
                  </button>
                )}
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-semibold transition-colors"
                >
                  {t.cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personal Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-6"
      >
        <h3 className="text-xl font-bold text-[#2D5016] mb-4 flex items-center gap-2">
          <User className="w-6 h-6" />
          {t.personalInfo}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#8B6F47] mb-1">
                {t.fullName}
              </label>
              <div className="flex items-center gap-2 text-[#2D5016] font-medium">
                <User className="w-5 h-5" />
                {user.name}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B6F47] mb-1">
                {t.phoneNumber}
              </label>
              <div className="flex items-center gap-2 text-[#2D5016] font-medium">
                <Phone className="w-5 h-5" />
                {user.phone}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B6F47] mb-1">
                {t.role}
              </label>
              <div className="flex items-center gap-2 text-[#2D5016] font-medium">
                <Award className="w-5 h-5" />
                {getRoleLabel()}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#8B6F47] mb-1">
                {t.cooperative}
              </label>
              <div className="flex items-center gap-2 text-[#2D5016] font-medium">
                <Users className="w-5 h-5" />
                {user.cooperative}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B6F47] mb-1">
                {t.region}
              </label>
              <div className="flex items-center gap-2 text-[#2D5016] font-medium capitalize">
                <MapPin className="w-5 h-5" />
                {user.region}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#8B6F47] mb-1">
                {t.language}
              </label>
              <div className="flex items-center gap-2 text-[#2D5016] font-medium">
                <MessageSquare className="w-5 h-5" />
                {getLanguageLabel()}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-xl font-bold text-[#2D5016] mb-4 flex items-center gap-2">
          <BarChart className="w-6 h-6" />
          {t.statistics}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#F5F1E8] to-[#E8E4D9] rounded-xl p-6 text-center"
              >
                <div className={`w-12 h-12 ${stat.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-[#2D5016] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#8B6F47] font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}