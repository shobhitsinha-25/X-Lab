import React, { useEffect, useState } from 'react';
import EditorNavbar from '../components/EditorNavbar';
import Editor from '@monaco-editor/react';
import { MdOutlineLightMode } from 'react-icons/md';
import { LuExpand } from 'react-icons/lu';
import { useParams } from 'react-router-dom';
import { api_base_url } from '../toggle';

const CodeEditor = () => {
    const [isLightMode, setIsLightMode] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [tab, setTab] = useState("html");
    const [htmlContent, setHtmlContent] = useState("<h1>Hello world</h1>");
    const [cssContent, setCssContent] = useState("body { background-color: white; }");
    const [jsContent, setJsContent] = useState("console.log('Hello, JavaScript!');");

    const changeTheme = () => setIsLightMode(!isLightMode);
    const toggleExpand = () => setIsExpanded(!isExpanded);

    let {projectId}=useParams();

    const srcDoc = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <style>${cssContent}</style>
        </head>
        <body>
            ${htmlContent}
            <script>${jsContent}</script>
        </body>
        </html>
    `;

useEffect(() => {
  fetch(api_base_url + "/getProject", {
    mode: "cors",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: localStorage.getItem("userId"),
      projectId: projectId 
    })
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Network response was not ok: ${res.statusText}`);
      }
      return res.json();
    })
    .then(data => {
      if (data && data.project) {
        setHtmlContent(data.project.htmlCode || "<h1>Hello world</h1>");
        setCssContent(data.project.cssCode || "body { background-color: white; }");
        setJsContent(data.project.jsCode || "console.log('Hello, JavaScript!');");
      } else {
        console.error("Project data is missing from response:", data);
      }
    })
    .catch(error => {
      console.error("Error fetching project data:", error);
      alert("Failed to load project data. Please try again later.");
    });
}, [projectId]);


 useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 's') {
      event.preventDefault(); 

      fetch(api_base_url + "/updateProject", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          projectId: projectId,  
          htmlCode: htmlContent,  
          cssCode: cssContent,    
          jsCode: jsContent       
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Project saved successfully");
        } else {
          alert(data.message || "Something went wrong");
        }
      })
      .catch((err) => {
        console.error("Error saving project:", err);
        alert("Failed to save project. Please try again.");
      });
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [projectId, htmlContent, cssContent, jsContent]);



    return (
        <>
            <EditorNavbar />
            <div className={`flex h-[100vh] ${isExpanded ? 'overflow-hidden' : ''}`}>
                <div className={`${isExpanded ? 'w-full' : 'w-[50%]'} bg-[black] flex-1`}>
                    <div className="flex items-center justify-between w-full h-[60px] bg-[#0d0d0d] px-[20px]">
                        <div className="flex items-center gap-3">
                            <div onClick={() => setTab("html")} className="p-[5px] text-[20px] cursor-pointer">HTML</div>
                            <div onClick={() => setTab("css")} className="p-[5px] text-[20px] cursor-pointer">CSS</div>
                            <div onClick={() => setTab("javascript")} className="p-[5px] text-[20px] cursor-pointer">JAVASCRIPT</div>
                        </div>
                        <div className="flex items-center gap-2">
                            <i className="text-[20px] cursor-pointer" onClick={changeTheme}>
                                <MdOutlineLightMode />
                            </i>
                            <i className="text-[20px] cursor-pointer" onClick={toggleExpand}>
                                <LuExpand />
                            </i>
                        </div>
                    </div>

                    
                    {tab === "html" ? (
                        <Editor
                            height="90vh"
                            theme={isLightMode ? 'vs-light' : 'vs-dark'}
                            language="html"
                            value={htmlContent}
                            onChange={(value) => setHtmlContent(value)}
                        />
                    ) : tab === "css" ? (
                        <Editor
                            height="90vh"
                            theme={isLightMode ? 'vs-light' : 'vs-dark'}
                            language="css"
                            value={cssContent}
                            onChange={(value) => setCssContent(value)}
                        />
                    ) : (
                        <Editor
                            height="90vh"
                            theme={isLightMode ? 'vs-light' : 'vs-dark'}
                            language="javascript"
                            value={jsContent}
                            onChange={(value) => setJsContent(value)}
                        />
                    )}
                </div>

                
                {!isExpanded && (
                    <iframe
                        className="right w-[50%] h-[100vh] bg-[white] flex-1 text-[black]"
                        srcDoc={srcDoc}
                        title="Output"
                        sandbox="allow-scripts"
                    />
                )}
            </div>
        </>
    );
};

export default CodeEditor;
