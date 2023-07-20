import Charity from './Charity'

function CharityList({charities, deleteCharity}){

    const charityComponents = charities.map(charity => {
        return <Charity key={charity.id} charity={charity} deleteCharity={deleteCharity}/>
    })

    return (
        <ul className="charity-list">{charityComponents}</ul>
        )
}

export default CharityList