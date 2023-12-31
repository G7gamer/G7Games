import React, { useEffect, useState } from "react";
import Game from "../components/Game";

const PlayGames = () => {
  const [games, setGames] = useState([]);

  const fetchGamesData = async () => {
    try {
      const response = await fetch("/api/game/getGames");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setGames(data);
    } catch (error) {
      console.error("Fetching data failed", error);
    }
  };

  useEffect(() => {
    fetchGamesData();
  }, []);

  const gamesElement = games.map((game) => {
    return (
      <div className="gameCard" key={game._id}>
        <h2 className="gameTitle">{game.title}</h2>
        <img className="gameImg" src={`${game.image}`} alt={`${game.title}`} />
        <p className="gameDescription">{game.description}</p>
        <div className="gamePlatforms">
          {game.platforms
            .filter((el) => el.checked)
            .map((el) => (
              <a
                target="_blank"
                className="platform"
                key={el._id}
                href={`${el.url}`}
              >
                <img className="platformImg" src={`/${el.name}.png`} />
              </a>
            ))}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h1 className="playGamesText">Checkout The Games</h1>
      <div className="playGamesSection">{gamesElement}</div>
    </div>
  );
};

export default PlayGames;
