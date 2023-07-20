function Charity({charity, deleteCharity}){
    return (
        <li className="charity">
            <h1>{charity.name}</h1>
            <h4>Where: {charity.location}</h4>
            <h4>When: {charity.date} {charity.time}</h4>
            <ul className="charity-description">{charity.description}</ul>
            <button className="charity-delete-button"onClick={() => deleteCharity(charity.id)}>Delete this volunteer oppportunity</button>
        </li>
    )
}

export default Charity