import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";
import "./home.scss";

const home = () => {
  return (
    <div className="home">
      <Share />
      <Posts />
    </div>
  );
};

export default home;
