import React from "react";
import "./styles.css"
function Availability_Cards_Title({ a }) {

  const lettersLimit = (x) => x.toString().length > 12 ? `${x.slice(0, 12)}...` : x;

  return (
    <table className="table_title"><tbody><tr><th>App Name</th><th>Sevice Name</th><th>Flow</th></tr>
        <tr style={{color: "#010150"}}>
          <td>{lettersLimit(a.appName)}</td>
          <td>{a.Flow}</td>
          <td>{lettersLimit(a.serviceName)}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Availability_Cards_Title;
