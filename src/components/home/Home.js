import './Home.css';
import {useEffect, useState} from "react";
import AxiosAPI from "../../Modules/AxiosAPI";

function Home() {

    // states
    const [members, setMembers] = useState()
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchMembers()
    }, [])


    const fetchMembers = () => {

        AxiosAPI(`./api/json_files/members.json`, 'GET', false).then((res) => {
            setMembers(res.payload)
            console.log(res)
        })


    }
    return (
        <div className="">
            {

                members && members.map(member => {

                    return <div className={""}>

                        {member.id}

                    </div>


                })

            }
        </div>
    );
}

export default Home;
