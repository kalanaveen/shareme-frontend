import { useState, useEffect } from "react";
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import { MasonryLayout } from ".";
import { Spinner } from ".";
import { useRouter } from 'next/router';

const Feed = () => {
    const [pins, setPins] = useState();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { categoryId } = router.query;

    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false); 
            });
        } else {
            setLoading(true);
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            })
        }
    }, [categoryId]);

    const ideaName = categoryId || 'new';

    if (loading) {
        return (
            <Spinner message={`Shareme adding ${ideaName} ideas to your feed`} />
        );
    }

    return (
        <div>
            {pins && (
                <MasonryLayout pins={pins} />
            )}
        </div>
    );
};

export default Feed;
