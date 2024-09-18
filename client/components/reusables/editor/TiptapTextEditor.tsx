// 'use client'

// import { Button } from '@/components/ui/button'
// import { useEditor, EditorContent, type EditorContentProps } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import Bold from '@tiptap/extension-bold'
// import Italic from '@tiptap/extension-italic'
// import Heading, { type Level } from '@tiptap/extension-heading'
// import Code from '@tiptap/extension-code'
// import Image from '@tiptap/extension-image'
// import Paragraph from '@tiptap/extension-paragraph'
// import Document from '@tiptap/extension-document'
// import TiptapLink from '@tiptap/extension-link'
// import Highlight from '@tiptap/extension-highlight'
// import { Bold as BoldIcon, CodeIcon, Heading1Icon, Italic as ItalicIcon, Smile, ImageIcon, HighlighterIcon, Highlighter, Heading1, Heading2Icon, Heading3, Heading4, Heading6, Heading5 } from 'lucide-react'
// import { useRef, useState } from 'react'
// import EmojiPicker, { Theme } from 'emoji-picker-react';
// import useClickOnOutside from '@/hooks/useClickOnOutside'
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// const Tiptap = () => {
//     const [openEmoji, setOpenEmoji] = useState(false)
//     const fileInputRef = useRef<HTMLInputElement>(null);
//     const emojiRef = useRef<HTMLButtonElement>(null);
//     useClickOnOutside(emojiRef, () => setOpenEmoji(false),);

//     // Define editor with extensions
//     const editor = useEditor({
//         extensions: [
//             StarterKit,
//             Paragraph,
//             Document,
//             Bold, // Bold extension
//             Italic, // Italic extension
//             Highlight.configure({ multicolor: true }),
//             TiptapLink,
//             Heading.configure({ HTMLAttributes: { class: '' }, }), // Heading extension (H1)
//             Code, // Code extension
//             Image, // Image extension
//         ],
//         editorProps: {
//             attributes: {
//                 class:
//                     "shadow appearance-none my-2 min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline",
//             },
//         },
//         autofocus: true,
//         content: '', // Customize the initial content here if needed
//     })

//     // Function to add an image to the editor
//     const addImage = (file: File) => {
//         const reader = new FileReader()
//         reader.onload = () => {
//             const url = reader.result as string
//             editor?.chain().focus().setImage({ src: url }).run()
//         }
//         reader.readAsDataURL(file)
//     }

//     return (
//         <div className="p-8">
//             {/* Toolbar */}
//             <div className="flex items-center gap-2 mb-4">
//                 {/* Bold */}
//                 <Button
//                     variant="outline"
//                     className={`${editor?.isActive('bold') ? 'bg-gray-200' : ''}`}
//                     onClick={() => editor?.chain().focus().toggleBold().run()}
//                 >
//                     <BoldIcon />
//                 </Button>
//                 {/* Italic */}
//                 <Button
//                     variant="outline"
//                     className={`${editor?.isActive('italic') ? 'bg-gray-200' : ''}`}
//                     onClick={() => editor?.chain().focus().toggleItalic().run()}
//                 >
//                     <ItalicIcon />
//                 </Button>
//                 {/* Heading  */}
//                 <HeadingComponent editor={editor} />
//                 <Button
//                     variant="outline"
//                     className={`${editor?.isActive('code') ? 'bg-gray-200' : ''}`}
//                     onClick={() => editor?.chain().focus().toggleCode().run()}
//                 >
//                     <CodeIcon />
//                 </Button>

//                 {/* Emoji Button */}
//                 <Button
//                     ref={emojiRef}
//                     variant="outline"
//                     className='relative'
//                     onClick={() => {
//                         setOpenEmoji(!openEmoji);
//                     }}
//                 >
//                     <Smile />
//                     <div onClick={(e) => e.stopPropagation()} className="absolute top-10 right-0 md:left-0 z-50">
//                         {openEmoji && <EmojiPicker height={280} width={300} theme={Theme.AUTO} className='h-full w-full' lazyLoadEmojis onEmojiClick={(e) => { editor?.chain().focus().insertContent(e.emoji).run(); }} />}
//                     </div>
//                 </Button>
//                 {/* Highlighter Button */}
//                 <HighlighterCompoent editor={editor} />
//                 {/* Image Upload Button */}
//                 <Button
//                     variant="outline"
//                     onClick={() => fileInputRef.current?.click()}
//                 >

//                     <ImageIcon />
//                     {/* Hidden file input for uploading images */}
//                     <input
//                         type="file"
//                         ref={fileInputRef}
//                         style={{ display: 'none' }}
//                         accept="image/*"
//                         onChange={(event) => {
//                             const file = event.target.files?.[0]
//                             if (file) {
//                                 addImage(file)
//                             }
//                         }}
//                     />
//                 </Button>
//             </div>
//             {/* Editor Content */}
//             <EditorContent editor={editor} />
//         </div>
//     )
// }

// export default Tiptap

// const HighlighterCompoent = ({ editor }: EditorContentProps) => {
//     const colors = ['yellow', 'red', 'green', 'blue', 'purple', 'black']
//     return (
//         <>
//             <Select onValueChange={(value) => editor?.chain().focus().setHighlight({ color: value }).run()}>
//                 <SelectTrigger className="max-w-20">
//                     <SelectValue placeholder={<Highlighter />} />
//                 </SelectTrigger>
//                 <SelectContent>
//                     <SelectGroup>
//                         <SelectLabel>Bg Colors</SelectLabel>
//                         {colors.map((color) => (
//                             <SelectItem
//                                 key={color}
//                                 value={color}
//                                 className={`${editor?.isActive('highlight', { color }) ? 'bg-gray-200' : ''}`}
//                             >
//                                 <Highlighter color={color} />
//                             </SelectItem>
//                         ))}

//                     </SelectGroup>
//                 </SelectContent>
//             </Select>
//         </>
//     )
// }


// const HeadingComponent = ({ editor }: EditorContentProps) => {
//     const headings = [
//         { elem: 1, icon: <Heading1 /> },
//         { elem: 2, icon: <Heading2Icon /> },
//         { elem: 3, icon: <Heading3 /> },
//         { elem: 4, icon: <Heading4 /> },
//         { elem: 5, icon: <Heading5 /> },
//         { elem: 6, icon: <Heading6 /> },

//     ]

//     return (
//         <Select onValueChange={(value) => {
//             editor?.chain().focus().toggleHeading({ level: parseInt(value) as Level }).run()
//         }}>
//             <SelectTrigger className="max-w-20">
//                 <SelectValue placeholder="Headings" />
//             </SelectTrigger>
//             <SelectContent>
//                 <SelectGroup>
//                     <SelectLabel>Select Heading</SelectLabel>
//                     {headings.map((level, index) => (
//                         <SelectItem
//                             key={level.elem}
//                             value={level.elem.toString()}
//                             className={`${editor?.isActive('heading', { level: level.elem }) ? 'bg-gray-200' : ''}`}
//                         >
//                             <div className="flex items-center gap-2">
//                                 {level.icon}
//                             </div>
//                         </SelectItem>
//                     ))}
//                 </SelectGroup>
//             </SelectContent>
//         </Select>
//     )
// }