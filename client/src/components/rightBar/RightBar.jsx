import "./rightBar.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const RightBar = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["latestActivities"],
    queryFn: async () => {
      try {
        const res = await makeRequest.get("/latestActivities");
        return res.data;
      } catch (err) {
        return err;
      }
    },
  });

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Latest Activities</span>
          {error ? (
            <div className="user"> Something went wrong </div>
          ) : isLoading ? (
            <div className="user"> Loading recent activities </div>
          ) : data.length === 0 ? (
            <div className="user">No recent activites</div>
          ) : (
            data.map((user) => {
              return (
                <div className="user" key={user.id}>
                  <div className="userInfo">
                    <img src={user.profilePic} alt="" />
                    <p>
                      <span>{user.username}</span> changed their {user.changed}{" "}
                      picture
                    </p>
                  </div>
                  <span>{moment(user.updatedAt).fromNow()}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
