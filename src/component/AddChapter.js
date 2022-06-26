import React, {useCallback, useRef, useState} from "react";
import AppNavbar from "./AppNavBar";
import { createReactEditorJS } from "react-editor-js";
import bookService from "../service/book.service";
import {useHistory, useParams} from "react-router-dom";
import {text} from "@fortawesome/fontawesome-svg-core";

const AddChapter = () => {

    const [volume,setVolume] = useState('');
    const [chapter,setChapter] = useState('');
    const [name,setName] = useState('');
    const [text,setText] = useState([]);
    const {id} = useParams();
    const history = useHistory();

    const EditorJs = createReactEditorJS();
    const editorCore = useRef(null);

    const handleInitialize = useCallback((instance) => {
        editorCore.current = instance
    }, []);

    async function handleSave() {
        let editorData = await editorCore.current.save();
        let blob = new Blob([JSON.stringify(editorData.blocks)], {type: "text/plain"});
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function (e) {
            let str = reader.result.split(',')[1];
            save(str);
        }
    }

    const save = (file) => {
        let bookId = id;
        let textChapter = {name,chapter,volume,bookId,file};

        bookService.addChapter(textChapter)
            .then(response => {
                console.log('Chapter added successfully',response.data);
                history.push('/');
            })
            .catch(error => {
                console.log('Something went wrong',error);
            })
    }

     return (
         <div>
             <AppNavbar/>
             <div className="page">
                 <div className="page__inner">
                     <div className="custom-container container-responsive container-offset">
                         <div className="paper">
                            <div className="section__header" style={{border:0}}>
                                <ul className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a>book.title</a>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <span>Сhapter creation</span>
                                    </li>
                                </ul>
                            </div>
                             <div className="section-body" style={{display:"flex",borderBottom:"solid 1px #38383a"}}>
                                 <div className="chapter-volume-number" style={{paddingRight:"8px"}}>
                                     <input type="text" placeholder="Volume" className="form__input" style={{maxWidth:"60px",paddingLeft:"8px",paddingRight:"8px"}} onChange={(e) => setVolume(e.target.value)} />
                                     <input type="text" placeholder="Chapter" className="form__input" style={{maxWidth:"60px",paddingLeft:"8px",paddingRight:"8px",marginLeft:"-1px"}} onChange={(e) => setChapter(e.target.value)} />
                                 </div>
                                 <div className="chapter-title" style={{flexGrow:"1",marginRight:"8px"}}>
                                     <input type="text" placeholder="Chapter title" className="form__input" onChange={(e) => setName(e.target.value)} />
                                 </div>
                                 <div className="create-chapter">
                                     <button className="button button_green" style={{paddingLeft:"12px",paddingRight:"12px"}} onClick={handleSave}>
                                         Create
                                     </button>
                                 </div>
                             </div>
                             <div className="section-body">
                                 <EditorJs onInitialize={handleInitialize}/>
                             </div>
                         </div>
                     </div>
                 </div>
                 <footer className="footer paper">
                 </footer>
             </div>
         </div>
     )
 }

 export default AddChapter;