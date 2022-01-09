import { useEffect, useState } from 'react';
import { MasonryLayout, Spinner } from '.';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import {useRouter} from 'next/router';

const Search = () => {
    const [pins, setPins] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter(); 
    const {searchTerm,categoryId} = router.query;
    
    useEffect(() => {
        if (searchTerm || categoryId!== '') {
            setLoading(true);
            const query = searchQuery(searchTerm || categoryId?.toLowerCase());
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            });
        } else {
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [searchTerm,categoryId]);

    return (
        <div>
            {loading && <Spinner message="Searching pins" />}
            {pins?.length !== 0 && <MasonryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="mt-10 text-center text-xl ">No Pins Found!</div>
            )}
        </div>
    )
}

export default Search;
