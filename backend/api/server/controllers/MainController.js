
import redis from "../src/config/redis";

import models from "../src/models";


class MainController {
  
    

  /**
   * updateScoreTable
   * Actualiza la tabla de puntuaciones maximas, envia una copia a traves del canal "new_table" y actualiza los valores del ranking en redis
   * @param { } 
   * @returns true or false
   */
  static async updateScoreTable(){
    console.log("updateScoreTable");
    let ret = [];

    const maxScores = await models.Score.findAll({
      include: [{ model: models.User }],
      distinct: true,
      order: [["score", "DESC"]],
      limit: 10,
    }).then((res) => {
      res.forEach((s) => {
        let full = s.getResource();
        ret.push(full);
      });
    });

    await redis.publish("new_table", JSON.stringify({ score_table: ret }));

    for (const i in ret){
      const el = ret[i].attributes
      const v = await redis.get(i);
      console.log(v);
      if (!v || v && JSON.parse(v) != el) {
        await redis.set(i, JSON.stringify(el));
      }
    }    
  }

  static async saveScore(data) {
    if (!data.user || !data.score) {
      console.log(data);
      console.log("saveScore ERROR: Los datos ingresados no son validos!");
      return 0;
    }
    let parsedScore = {
      user_id: data.user,
      score: data.score,
    };
  
    return await models.Score.create(parsedScore)
      .then(() => {
        return 1;
      })
      .catch((er) => {
        console.error("saveScore ERROR: ", error.message);
        return 0;
      });
  }

  static async createUser(data) {
    if (!data.name || !data.password) {
      console.log(data);
      console.log("createUser ERROR: Los datos ingresados no son validos!");
      return 0;
    }
    let parsedUser = {
      name: data.name,
      password: data.password,
    };
  
    return await models.User.create(parsedUser)
      .then(() => {
        return 1;
      })
      .catch((error) => {
        console.error("createUser ERROR: ", error.message);
        return 0;
      });
  }
}

export default MainController;