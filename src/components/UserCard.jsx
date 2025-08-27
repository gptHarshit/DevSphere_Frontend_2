const UserCard = ({ user }) => {
  console.log(user);
  const { firstName, lastName, photoUrl, age, gender, skills, about } = user;
  return (
    <div className="card bg-base-300 w-96 h-96 shadow-xl mt-10">
      <figure>
        <img src={user.photoUrl} alt="photo" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center mt-5">
          <button className="btn btn-primary">ignore</button>
          <button className="btn btn-secondary">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
