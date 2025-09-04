import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";

const TagInput = ({ value = [], onChange, errors }) => {
    const [tagList, setTagList] = useState(value);
    const [tag, setTag] = useState("");
    const { course, editCourse } = useSelector((state) => state.course);

    const addTag = () => {
        const trimmedTag = tag.trim();
        if (trimmedTag && !tagList.includes(trimmedTag)) {
            const newTags = [...tagList, trimmedTag];
            setTagList(newTags);
            onChange(newTags); // update form state
            setTag("");
        }
    };

    const removeTag = (index) => {
        const newTags = tagList.filter((_, i) => i !== index);
        setTagList(newTags);
        onChange(newTags);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag();
        }
    };

    useEffect(() => {
        if (editCourse && course) {
            setTagList(course?.tag);
            onChange(course?.tag);
        }
        else{
            setTagList([])
            onChange([])
        }
    }, [editCourse, course, onChange]);

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="courseTag" className="text-sm">
                Tags <span className="text-red-500">*</span>
            </label>

            <div className="flex flex-row flex-wrap gap-2 pl-5">
                {tagList.map((t, index) => (
                    <div
                        key={index}
                        className="bg-yellow-500 mb-1 px-2 py-1 text-sm rounded-full flex flex-row items-center gap-2"
                    >
                        <p>{t}</p>
                        <button
                            type="button"
                            onClick={() => removeTag(index)}
                            className="hover:text-red-900"
                        >
                            <RxCross2 strokeWidth={1.5} />
                        </button>
                    </div>
                ))}
            </div>

            <input
                type="text"
                className="bg-richblack-900 rounded-md p-[.65rem]"
                id="courseTag"
                placeholder="Enter a tag and press , or Enter"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                onKeyDown={handleKeyDown}
            />

            {errors?.courseTag && (
                <span className="text-red-500 text-sm">
                    {errors.courseTag.message}
                </span>
            )}
        </div>
    );
};

export default TagInput;
