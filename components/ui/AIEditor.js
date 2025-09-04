import dynamic from 'next/dynamic'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import 'react-quill-new/dist/quill.snow.css'
import { fetchEventSource } from '@microsoft/fetch-event-source'
import * as LucideIcons from 'lucide-react'

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false })

const systemPrompts = {
  rewrite: `You are an AI assistant specialized in rewriting text for business plans. Your task is to rewrite the given text while maintaining its core meaning and context. The rewrite should be professional, clear, and suitable for a business plan. Consider the company details and current section when rewriting.`,
  expand: `You are an AI assistant specialized in expanding text for business plans. Your task is to elaborate on the given text, providing more details, examples, or explanations. The expansion should be relevant to the business plan context and add value to the content. Consider the company details and current section when expanding.`,
  summarize: `You are an AI assistant specialized in summarizing text for business plans. Your task is to condense the given text into a concise summary while retaining the key points. The summary should be clear, informative, and suitable for a business plan. Consider the company details and current section when summarizing.`,
  complete: `You are an AI assistant specialized in helping users create comprehensive business plans. Your role is to provide templates with sample answers for specific sections of a business plan as requested by the user. Provide a structure that encourages actionable and practical content, tailored to the specific company and section.`
}

export default function AIEditor({ 
  aiEnabled = false, 
  placeholder = "Start typing here...", 
  value, 
  onChange, 
  className, 
  icon, 
  iconClassName, 
  showToolbar = false,
  showPlaceholder = true 
}) {
  const [isStreamComplete, setIsStreamComplete] = useState(false);
  const [content, setContent] = useState(value || '') // Initialize content with value if provided
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const [selectedText, setSelectedText] = useState('')
  const [isAIEnabled, setIsAIEnabled] = useState(aiEnabled)
  const quillRef = useRef(null)

  // Update content when value prop changes
  useEffect(() => {
    if (value !== undefined && value !== content) {
      setContent(value)
    }
  }, [value])

  const toggleAI = () => {
    setIsAIEnabled(!isAIEnabled)
  }

  const handleContentChange = (value) => {
    setContent(value);
    if (onChange) {
      onChange(value);
    }
  }

  const call_eventSource = async (messages, command) => {
    let url = '/api/completion';
    try {
        await fetchEventSource(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                article_messages: messages,
                command
            }),
            openWhenHidden: true,
            onopen(response) {
                if (response.ok && response.status === 200) {
                    console.log('Connection established');
                } else {
                    throw new Error(`Failed to establish connection: ${response.status} ${response.statusText}`);
                }
            },
            onmessage(event) {
                try {
                    const decodedData = decodeURIComponent(event.data);
                    const quill = quillRef.current.getEditor()
                    const range = quill.getSelection()
                    if (range) {
                        if (command === 'Rewrite' || command === 'Summarize' || command === 'Expand') {
                            quill.deleteText(range.index, range.length)
                        }
                        quill.insertText(range.index, decodedData, 'user')
                        quill.setSelection(range.index + decodedData.length)
                    }
                } catch (parseError) {
                    console.error('Error parsing event data:', parseError);
                }
            },
            onclose() {
                setIsStreamComplete(true);
                setIsGenerating(false);
            },
            onerror(err) {
                console.error('EventSource failed:', err);
                setIsGenerating(false);
            }
        })
    } catch (error) {
        console.error("Error in fetching event source:", error)
        setIsGenerating(false);
    }
  }

  const handleKeyDown = useCallback(
    async (e) => {
      if (e.key === 'Tab' && isAIEnabled && quillRef.current) {
        e.preventDefault()
        setIsGenerating(true)

        const quill = quillRef.current.getEditor()
        const range = quill.getSelection()
        if (range) {
          const textBeforeCursor = quill.getText(0, range.index).trim()
          const currentSection = getCurrentSection(textBeforeCursor)
          const companyDetails = getCompanyDetails()

          try {
            const messages = [{
              'role': 'system',
              'content': systemPrompts.complete
            }, {
              'role': 'user',
              'content': `Company Name: ${companyDetails.name}\nCompany Description: ${companyDetails.description}\nCity: ${companyDetails.city}\nState: ${companyDetails.state}\n\nCurrent section: ${currentSection.title}\n\nSection description: ${currentSection.description}\n\n${textBeforeCursor ? `Please complete the remaining text with a template including sample answers: ${textBeforeCursor}` : 'Please provide a template with sample answers for this section.'}`
            }]
            await call_eventSource(messages, 'Complete')
          } catch (error) {
            console.error('Error generating completion:', error)
          } finally {
            setIsGenerating(false)
          }
        }
      }
    },
    [isAIEnabled]
  )

  const getCompanyDetails = () => {
    return {
      name: "TechInnovate Solutions",
      description: "A cutting-edge software development company specializing in AI-driven applications for small to medium-sized businesses",
      city: "Austin",
      state: "Texas"
    }
  }

  const getCurrentSection = (text) => {
    return {
      title: "Executive Summary",
      description: "What product or service will your business provide?Describe your product or service and make the case for why your product will be successful. How does your product or service fulfill your customer need in a unique way?"
    }
  }

  const handleSelection = () => {
    if (!isAIEnabled || !quillRef.current) {
      setShowPopup(false)
      return
    }
    const quill = quillRef.current.getEditor()
    const range = quill.getSelection()
    if (range && range.length > 0) {
      const bounds = quill.getBounds(range.index + range.length)
      setPopupPosition({ top: bounds.top + bounds.height, left: bounds.left })
      setSelectedText(quill.getText(range.index, range.length))
      setShowPopup(true)
    } else {
      setShowPopup(false)
    }
  }

  const handleAICommand = async (command) => {
    setIsGenerating(true)
    const companyDetails = getCompanyDetails()
    const currentSection = getCurrentSection(selectedText)

    try {
      const messages = [{
        'role': 'system',
        'content': systemPrompts[command.toLowerCase()]
      }, {
        'role': 'user',
        'content': `Company Name: ${companyDetails.name}\nCompany Description: ${companyDetails.description}\nCity: ${companyDetails.city}\nState: ${companyDetails.state}\n\nCurrent section: ${currentSection.title}\n\nSection description: ${currentSection.description}\n\nSelected text: ${selectedText}\n\nPlease ${command.toLowerCase()} the selected text.`
      }]
      await call_eventSource(messages, command)
    } catch (error) {
      console.error('Error executing AI command:', error)
    } finally {
      setIsGenerating(false)
      setShowPopup(false)
    }
  }

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor()
      quill.root.addEventListener('keydown', handleKeyDown)
      quill.on('selection-change', handleSelection)
      return () => {
        quill.root.removeEventListener('keydown', handleKeyDown)
        quill.off('selection-change', handleSelection)
      }
    }
  }, [handleKeyDown])

  return (
    <div className="relative">
      {icon && (
        <span className={iconClassName}>
          {React.createElement(LucideIcons[icon])}
        </span>
      )}
      <ReactQuill
        ref={quillRef}
        value={content}
        onChange={handleContentChange}
        modules={{
          toolbar: showToolbar ? [
            [{ 'header': [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link']
          ] : false,
        }}
        className={`${className || "w-full text-gray-700 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"} ${!showToolbar ? 'no-toolbar' : 'with-toolbar'}`}
        placeholder={isAIEnabled ? `${placeholder} (Press Tab for AI completion)` : placeholder}
      />
      <style jsx global>{`
        .ql-container.ql-snow {
          border: 2px solid #94a3b8;
          border-radius: 0 0 0.5rem 0.5rem;
          font-family: inherit;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .ql-toolbar.ql-snow {
          border: 2px solid #94a3b8;
          border-bottom: 2px solid #94a3b8;
          border-radius: 0.5rem 0.5rem 0 0;
          background-color: #f8fafc;
          box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
          padding: 0.75rem;
        }
        .ql-toolbar.ql-snow .ql-formats {
          margin-right: 12px;
        }
        .ql-toolbar.ql-snow button {
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .ql-toolbar.ql-snow button:hover {
          background-color: #e2e8f0;
        }
        .ql-toolbar.ql-snow button.ql-active {
          background-color: #dbeafe;
          color: #2563eb;
        }
        .ql-toolbar.ql-snow .ql-picker {
          height: 28px;
        }
        .ql-toolbar.ql-snow .ql-picker-label {
          border-radius: 4px;
          padding: 2px 8px;
        }
        .ql-toolbar.ql-snow .ql-picker-label:hover {
          background-color: #e2e8f0;
        }
        .ql-editor {
          padding: ${showToolbar ? '15px' : '12px 15px'};
          font-size: 16px;
          min-height: 80px;
        }
        .ql-editor.ql-blank::before {
          font-size: 16px;
          font-style: italic;
          color: #6B7280;
        }
        .no-toolbar .ql-editor {
          border-top: none;
          border-radius: 0.375rem;
        }
        .with-toolbar .ql-container.ql-snow {
          border-top: none;
        }
      `}</style>
      {isGenerating && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      {showPopup && (
        <div 
          className="absolute bg-white border border-blue-200 rounded-lg shadow-lg p-4"
          style={{ 
            top: `${popupPosition.top}px`, 
            left: `${popupPosition.left}px`, 
            minWidth: '200px',
            maxWidth: '300px',
            transform: `translateX(${Math.min(0, window.innerWidth - (popupPosition.left + 300))}px)`
          }}
        >
          <div className="text-sm font-semibold text-blue-700 mb-3 border-b border-blue-100 pb-2">AI Commands</div>
          <div className="space-y-2">
            <button 
              onClick={() => handleAICommand('Rewrite')} 
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Rewrite
            </button>
            <button 
              onClick={() => handleAICommand('Expand')} 
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
              Expand
            </button>
            <button 
              onClick={() => handleAICommand('Summarize')} 
              className="flex items-center w-full text-left px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <svg className="w-5 h-5 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              Summarize
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
