import axios from "axios";

const base_url = import.meta.env.VITE_APP_BASE_URL

export const fetchAllCategories = async () => {
    try {
        const response = await axios.get(`${base_url}/catalog/getAllCategory`);

        if (response.data.success) return response.data?.allCategory;

        console.log('Unexpected response:', response);
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

export const getCatalogData = async (categoryId) => {
    try {
        const response = await axios.get(`${base_url}/catalog/catalogPageData`, {
            params: {categoryId}
        })

        if (response.data.success) return response.data.data

        console.log('Unexpected response:', response);
    }
    catch (error) {
        console.error('Error fetching getCatalogData:', error);
    }
}
