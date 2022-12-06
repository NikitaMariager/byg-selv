import React, { Component } from "react";
import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import Loader from "../components/Error";
import Error from "../components/Error";

function Home() {
  //request-hook
  const { error, loading, data, getData } = useGetData();

  //State
  const [search, setSearch] = useState("*");

  //når component loader udføres nedenfor funktion
  useEffect(() => {
    callAPI();
  }, [search]);

  //Genbrug af url - gemmer API adreesen i en var for kun at have url stående et sted
  const callAPI = () => {
    if (search.length) {
      getData(
        "https://api.smk.dk/api/v1/art/search/?keys=" +
          search +
          "&filters=[has_image:true, has_production_date:true]&offset=0&rows=10"
      );
    }
  };

  return (
    <div className="home">
      <input
        list="searchOptions"
        type="text"
        autoComplete="off"
        placeholder="Hvad leder du efter?"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>
      <datalist id="searchOptions">
        {data &&
          data.items.map((a) => (
            <option key={a.id}>{a.titles[0].title}</option>
          ))}
      </datalist>

      <div className="msgcontainer">
        {/* error */}
        {error && <Error />}

        {/* loading */}
        {loading && <Loader />}
      </div>

      {data && (
        <h2>
          {data.found} <span>værker</span>{" "}
        </h2>
      )}
      <div className="art-container">
        {data &&
          data.items.map((a, i) => (
            <div key={"værk" + i}>
              <div className="image-container">
                <img src={a.image_thumbnail} alt=""></img>
              </div>
              <h4>
                {a.titles[0].title}, {a.production_date[0].period}
              </h4>
              <h4>{a.production[0].creator}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
