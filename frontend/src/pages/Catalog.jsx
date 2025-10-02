import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAllCategories, getCatalogData } from '../operations/catalogApi';
import CourseSlider from '../components/core/catalog/CourseSlider';
import Footer from '../components/common/Footer';
import { Spinner } from './Spinner';

const Catalog = () => {
    const { ctName } = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [catelogPageData, setCatalogPageData] = useState(null);
    const [currTab, setCurrTab] = useState('Most popular');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCategoryId = async () => {
            setLoading(true);
            const categories = await fetchAllCategories();
            if (categories.length) {
                const foundCategory = categories.find(
                    (cat) => cat.name.trim().toLowerCase() === ctName.trim().toLowerCase()
                );
                if (foundCategory) {
                    setCategoryId(foundCategory._id);
                }
            }
            setLoading(false);
        };
        fetchCategoryId();
    }, [ctName]);

    useEffect(() => {
        const fetchCatalogData = async () => {
            if (categoryId) {
                setLoading(true);
                const result = await getCatalogData(categoryId);
                setCatalogPageData(result);
                setLoading(false);
            }
        };
        fetchCatalogData();
    }, [categoryId]);

    if (!catelogPageData || loading) return <Spinner />;

    return (
        catelogPageData && (
            <>
                <div className='bg-richblack-800 text-richblack-5'>
                    <div className='w-11/12 max-w-maxContent mx-auto flex flex-col md:flex-row gap-8 md:gap-10 py-10 justify-between'>
                        <div className='flex flex-col gap-2 w-full md:w-[70%]'>
                            <p className='text-sm text-richblack-300'>
                                Home / Catalog / <span className='text-yellow-50'>{ctName}</span>
                            </p>
                            <h1 className='text-2xl md:text-3xl font-medium'>{ctName}</h1>
                            <p className='text-sm text-richblack-200'>
                                {catelogPageData.selectedCategory.description}
                            </p>
                        </div>

                        <div className='w-full md:w-auto'>
                            <h1 className='text-lg font-semibold mb-2'>Related resources</h1>
                            <ul className='text-sm text-richblack-100 list-disc list-inside'>
                                <li>Cheatsheets</li>
                                <li>Articles</li>
                                <li>Community Forums</li>
                                <li>Projects</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='bg-richblack-900 text-richblack-5 mb-10'>
                    <div className='w-11/12 max-w-maxContent mx-auto py-10 flex flex-col gap-16 md:gap-28'>
                        <div className='flex flex-col gap-4'>
                            <h1 className='text-2xl md:text-3xl font-semibold'>Courses to get you started</h1>
                            <div className='flex flex-row gap-5 border-b border-richblack-400'>
                                <div
                                    onClick={() => setCurrTab('Most popular')}
                                    className={`px-2 py-1 cursor-pointer ${currTab === 'Most popular' ? 'border-b-[1.5px] border-yellow-50 text-yellow-50' : ''}`}
                                >
                                    Most popular
                                </div>
                                <div
                                    onClick={() => setCurrTab('New')}
                                    className={`px-2 py-1 cursor-pointer ${currTab === 'New' ? 'border-b-[1.5px] border-yellow-50 text-yellow-50' : ''}`}
                                >
                                    New
                                </div>
                            </div>
                            <div className='mt-5'>
                                <CourseSlider courses={catelogPageData.selectedCategory.courses} />
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='text-2xl md:text-3xl font-semibold'>
                                Top courses in <span>{catelogPageData.differentCategory.name}</span>
                            </h1>
                            <div>
                                <CourseSlider courses={catelogPageData.differentCategory.courses} />
                            </div>
                        </div>

                        <div className='flex flex-col gap-4'>
                            <h1 className='text-2xl md:text-3xl font-semibold'>Frequently Bought Together</h1>
                            <div>
                                <CourseSlider courses={catelogPageData.mostSellingCourses} />
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </>
        )
    );
};

export default Catalog;