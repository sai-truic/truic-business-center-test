import React from 'react';
import { QRInput } from '../QRForms/QRInput';
import { motion, AnimatePresence } from 'framer-motion';
import { Type, Palette, Frame as FrameIcon, Maximize } from 'lucide-react';

export function FrameSettings({ handleInputChange }) {
    const [activeSection, setActiveSection] = React.useState('text');

    const sectionVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <div className="space-y-4">
            {/* Navigation Tabs */}
            <div className="flex space-x-2 p-1 bg-gray-50 rounded-lg">
                {[
                    { id: 'text', label: 'Text', icon: Type },
                    { id: 'colors', label: 'Colors', icon: Palette },
                    { id: 'margin', label: 'Margin', icon: Maximize }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveSection(tab.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                            activeSection === tab.id
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                        }`}
                    >
                        <tab.icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{tab.label}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {activeSection === 'text' && (
                    <motion.div
                        key="text"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-4"
                    >
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label htmlFor="FrameText" className="block text-sm font-medium text-gray-900">
                                        Frame Text
                                    </label>
                                    <span className="text-xs text-gray-500">Displayed below QR code</span>
                                </div>
                                <input
                                    type="text"
                                    id="FrameText"
                                    name="FrameText"
                                    placeholder="Scan Me"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    className="w-full px-3 py-2 text-gray-900 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                                />
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeSection === 'colors' && (
                    <motion.div
                        key="colors"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 gap-4">
                            <QRInput 
                                label="Text Color"
                                type="color"
                                name="FrameTextColor"
                                placeholder="#000000"
                                handleInputChange={handleInputChange}
                            />
                            <QRInput 
                                label="Frame Border Color"
                                type="color"
                                name="FrameColor"
                                placeholder="#4F46E5"
                                handleInputChange={handleInputChange}
                            />
                            <QRInput 
                                label="Frame Background"
                                type="color"
                                name="FrameBackgroundColor"
                                placeholder="#4f46e5"
                                handleInputChange={handleInputChange}
                            />
                            <QRInput 
                                label="Frame Foreground"
                                type="color"
                                name="FrameForegroundColor"
                                placeholder="#000000"
                                handleInputChange={handleInputChange}
                            />
                        </div>
                    </motion.div>
                )}

                {activeSection === 'margin' && (
                    <motion.div
                        key="margin"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="space-y-4"
                    >
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium text-gray-900">
                                        Margin Settings
                                    </label>
                                    <span className="text-xs text-gray-500">Add spacing around QR code</span>
                                </div>
                                <QRInput 
                                    label="Include Margin"
                                    type="checkbox"
                                    name="IncludeMargin"
                                    handleInputChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default FrameSettings;
