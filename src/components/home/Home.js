import './Home.css';
import {useEffect, useState} from "react";
import AxiosAPI from "../../Modules/AxiosAPI";
import DataTable from 'react-data-table-component';
import {absentTableColumns} from "./data/absentTableColumns";
import * as dayjs from 'dayjs'
import {useDispatch, useSelector} from "react-redux";
import {memberResult} from "../../redux/actions";
import ICalendarLink from "react-icalendar-link";

export default function Home() {

    const isBetween = require('dayjs/plugin/isBetween')
    dayjs.extend(isBetween)
    // states
    const [filteredMembers, setFilteredmembers] = useState([])
    const [absentTypes, setAbsentTypes] = useState([])
    const [loading, setLoading] = useState(true)
    const [CelenderData, setCelenderData] = useState({})
    const dispatch = useDispatch();
    const members = useSelector(state => state.membersAbsent);


    useEffect(() => {
        fetchData()

    }, [])

    const absentFilterChange = () => {

        let absentDate = document.getElementById('absentDate').value
        let absentType = document.getElementById('absentType').value

        let res = members.filter(item => {
            return (dayjs(absentDate).isBetween(item.startDate, item.endDate, null, '[]'))

                && (item.absentType === absentType || absentType === 'All')

        })
        setFilteredmembers(res)

    }


    const clearFilters = () => {

        document.getElementById('absentDate').value = '';
        document.getElementById('absentType').value = 'All'

        setFilteredmembers(members)


    }
    const fetchData = () => {

        AxiosAPI(`./api/json_files/absences.json`, 'GET', false).then((absentsRes) => {

            //get members list
            AxiosAPI(`./api/json_files/members.json`, 'GET', false).then((membersRes) => {

                let membersAbsents = [];

                absentsRes.payload.map(absent => {
                    // for each absent get member data required for the table list
                    let userData = membersRes.payload.find(member => {
                        return member.userId === absent.userId
                    })
                    let period = dayjs(absent.endDate).diff(dayjs(absent.startDate), 'day')
                    userData && membersAbsents.push({
                        memberName: userData.name,
                        absentType: absent.type,
                        absentStatus: absent.confirmedAt ? 'Confirmed' : absent.rejectedAt ? 'Rejected' : '',
                        admitterNote: absent.admitterNote,
                        memberNote: absent.memberNote,
                        period: period === 0 ? 1 : period,
                        endDate: absent.endDate,
                        startDate: absent.startDate,
                        calender: <ICalendarLink className="calender-link" event={{
                            title: userData.name,
                            description: absent.type,
                            startTime: absent.startDate,
                            endTime: absent.endDate,
                            location: "",
                            attendees: []
                        }
                        }>
                            Add to Calendar
                        </ICalendarLink>
                    })


                })

                dispatch(memberResult(membersAbsents))
                setFilteredmembers(membersAbsents)
                setLoading(false)


            })


        })
        let absentsTypes = [];
        AxiosAPI(`./api/json_files/absences.json`, 'GET', false).then((res) => {
            res.payload.map(item => {
                absentsTypes.push(item.type);
            })
            // unique absent types for filter
            setAbsentTypes([...new Set(absentsTypes)])
        })

    }


    return (
        <div className="container p-5">
            <div
                className={"p-3 flex-column flex-lg-row flex-md-row  d-flex gap-3 align-items-start align-items-md-center align-items-lg-center"}>

                <select className={"form-control"} id="absentType"
                        onChange={(event) => absentFilterChange('type', event)}>

                    <option value={'All'}>All</option>
                    {

                        absentTypes.map(item => {
                            return <option value={item} key={item}> {item}</option>
                        })


                    }

                </select>

                <input className={"form-control"} type="date" id="absentDate"
                       onChange={(event) => absentFilterChange('date', event)}/>

                <button className={"btn  btn-danger"} onClick={clearFilters}> Clear</button>
            </div>
            <DataTable title="Members' Absents" columns={absentTableColumns}
                       data={filteredMembers}
                       progressPending={loading} responsive
                       highlightOnHover

                       pagination
                       striped
            />


        </div>
    );
}


