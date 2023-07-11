import styles from '../styles/userdetails.module.css'

export default function UserDetails({ user, updateShowUserDetailsHandler }: { user: usersType, updateShowUserDetailsHandler: () => void }) {
    const { id, name, username, email, address, phone, website, company } = user
    const { street, suite, city, zipcode, geo } = address
    const { lat, lng } = geo
    const { name: companyName, catchPhrase, bs } = company
    return (
        <>
            {user && <div className={styles.user_details_container}>
                <div className={styles.user_details_section}>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Id:</h4>
                        <h4 className='ml-2'>{id}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Name:</h4>
                        <h4 className='ml-2'>{name}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Username:</h4>
                        <h4 className='ml-2'>{username}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Email:</h4>
                        <h4 className='ml-2'>{email}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Phone:</h4>
                        <h4 className='ml-2'>{phone}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Website:</h4>
                        <h4 className='ml-2'>{website}</h4>
                    </span>
                </div>
                <div className={styles.user_details_section}>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Address:</h4>
                        <h4 className='ml-2'>{street}, {suite}, {city}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Zipcode:</h4>
                        <h4 className='ml-2'>{zipcode}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Coordinates:</h4>
                        <h4 className='ml-2'>{lat}, {lng}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Company Name:</h4>
                        <h4 className='ml-2'>{companyName}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Catch Phrase:</h4>
                        <h4 className='ml-2'>{catchPhrase}</h4>
                    </span>
                    <span className='display-flex justify-content-center align-items-center'>
                        <h4>Business:</h4>
                        <h4 className='ml-2'>{bs}</h4>
                    </span>
                </div>
            </div>}
            <button
                className={styles.back_button}
                onClick={() => updateShowUserDetailsHandler()}
            >
                Back To All Users
            </button>
        </>
    )
}