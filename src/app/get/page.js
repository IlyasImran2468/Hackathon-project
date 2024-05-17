"use client"
import { useState } from 'react';
import { adPosts } from '../config/firebase';
import Link from 'next/link';
import "./get.css"

const AddPostForm = () => {
    const [img, setImg] = useState(null);
    const [des, setDes] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImg(file);
    };

    const addItem = async () => {
        if (img && des) {
            await adPosts({
                des,
                img
            });
        }
    };

    return (
        <div className="add-post-form-container">
            {/* Icon for adding image */}
           
            <input 
                id="file-input"
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ display: 'none' }} 
            />
            <input
                placeholder="What's on your mind?"
                value={des}
                onChange={(e) => setDes(e.target.value)}
            />
             <label htmlFor="file-input" >
                <img className="image-upload"
                    src="https://icons.veryicon.com/png/o/business/back-stage-management/upload-pictures-1.png" 
                    alt="Add Image" 
                   
                />
            </label>
            <Link href="/route">
    <button onClick={addItem}>POST</button>
</Link>

        </div>
    );
};

export default AddPostForm;
