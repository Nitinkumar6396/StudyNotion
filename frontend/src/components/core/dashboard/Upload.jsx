import React, { useEffect } from 'react';
import { FiUploadCloud } from "react-icons/fi";
import { useSelector } from 'react-redux';

const Upload = ({ value = null, onChange, errors, name, view }) => {

    // const [inputFile, setInputFile] = useState(null)
    const { course, editCourse } = useSelector(state => state.course)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        onChange(file)
        // setInputFile()
    }

    useEffect(() => {
        if (editCourse && course) {
            name === 'thumbnailImage' ? course?.thumbnail : course?.videoUrl
        }
    })

    return (
        <div className='flex flex-col gap-1'>
            <label className='text-sm'>
                {name === 'thumbnailImage' ? 'Course Thumbnail' : 'Lecture Video'} <span className='text-red-500'>*</span>
            </label>

            {value ? (
                <div className='flex flex-col gap-1 items-end'>
                    {name === 'thumbnailImage' ? (
                        <img
                            className='w-full h-52 rounded-md object-cover object-center'
                            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                            alt='preview'
                        />
                    ) : (
                        <video
                            className='w-full h-52 rounded-md object-cover object-center'
                            src={typeof value === 'string' ? value : URL.createObjectURL(value)}
                            controls
                        />
                    )}
                    {
                        view || <label htmlFor={name} className='w-fit cursor-pointer text-sm text-yellow-50'>
                            Choose another {name === 'thumbnailImage' ? 'thumbnail' : 'video'}
                        </label>
                    }
                </div>
            ) : (
                <label htmlFor={name} className='w-full h-52 rounded-md bg-richblack-900 cursor-pointer'>
                    <div className='w-full h-full flex gap-2 text-richblack-200 flex-col justify-center items-center'>
                        <div className='w-10 h-10 bg-yellow-900 flex items-center justify-center rounded-full text-yellow-50'>
                            <FiUploadCloud size={24} />
                        </div>
                        <div className='text-xs text-center'>
                            Drag and drop a {name === 'thumbnailImage' ? 'thumbnail' : 'video'}, or{' '}
                            <span className='text-yellow-50 font-semibold'>Browse</span>
                            <br /> Max 6MB for images, 12MB for videos
                        </div>
                        <ul className='flex text-center flex-col sm:flex-row justify-between mt-5 max-w-[22rem] w-full gap-3 list-inside list-disc text-xs'>
                            <li>Aspect ratio 16:9</li>
                            <li>Recommended size 1024x576</li>
                        </ul>
                    </div>
                </label>
            )}

            <input
                type='file'
                accept={name === 'thumbnailImage' ? 'image/*' : 'video/*'}
                id={name}
                name={name}
                hidden
                disabled={view}
                className='w-full h-10'
                onChange={handleFileChange}
            />

            {errors[name] && (
                <span className='text-red-500 text-sm'>{errors[name].message}</span>
            )}
        </div>
    );
};

export default Upload;
