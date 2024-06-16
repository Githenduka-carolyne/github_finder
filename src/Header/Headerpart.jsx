import "./header.css"
const Headerpart = ()=>{
    return (
      <section className="head-section">
        <div className="head-wrapper">
          <div className="head-container">
            <h1 className="logo">GITHUB FINDER</h1>
          </div>
          <div className="link-side">
            <a href="">By Githenduka Carolyne</a>
            </div>
            <div className="input-side">
              <input type="text" placeholder="enter a username" required></input>
              <button className="btn">Search</button>
            </div>
          </div>
      
      </section>
    );
};
export default Headerpart;