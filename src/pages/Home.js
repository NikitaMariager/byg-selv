import React, { Component } from "react";
import { useEffect, useState } from "react";
import useGetData from "../hooks/useGetData";
import Loader from "../components/Error";
import Error from "../components/Error";
import { ko } from "date-fns/locale";

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
          "&filters=[has_image:true]&offset=0&rows=10"
      );
    }
  };

  return (
    <div>
      <input
        placeholder="Hvad leder du efter?"
        defaultValue={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      ></input>

      <div className="msgcontainer">
        {/* error */}
        {error && <Error />}

        {/* loading */}
        {loading && <Loader />}
      </div>

      <div>
        {data &&
          data.items.map((a, i) => (
            <div key={"værk" + i}>
              <h4>{a.titles[0].title}</h4>
              <div className="image-container">
                <img src={a.image_thumbnail} alt=""></img>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
