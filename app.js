new Vue({
  el: "#app",
  data: {
    player_heal: 100,
    monster_heal: 100,
    attack_multiplier: 10,
    special_attack_multiplier: 25,
    heal_up_multiplier: 20,
    monster_attack_multiplier: 15,
    game_is_on: false,
    log_text: {
      attack: "OYUNCU ATAĞI: ",
      special_attack: "ÖZEL OYUNCU ATAĞI: ",
      monster_attack: "CANAVAR ATAĞI: ",
      heal_up: "İLK YARDIM: ",
      give_up: "OYUNCU PES ETTİ!!!",
    },
    logs: [],
  },
  methods: {
    start_game: function () {
      this.game_is_on = true;
    },
    attack: function () {
      var point = Math.ceil(Math.random() * this.attack_multiplier);
      this.monster_heal -= point;
      this.add_to_log({ turn: "p", text: this.log_text.attack + point });
      this.monster_attack();
    },
    special_attack: function () {
      var point = Math.ceil(Math.random() * this.special_attack_multiplier);
      this.monster_heal -= point;
      this.add_to_log({
        turn: "p",
        text: this.log_text.special_attack + point,
      });
      this.monster_attack();
    },
    heal_up: function () {
      var point = Math.ceil(Math.random() * this.heal_up_multiplier);
      this.player_heal += point;
      this.add_to_log({ turn: "p", text: this.log_text.heal_up + point });
      this.monster_attack();
    },
    give_up: function () {
      this.player_heal = 0;
      this.add_to_log({ turn: "p", text: this.log_text.give_up + point });
    },
    monster_attack: function () {
      var point = Math.ceil(Math.random() * this.monster_attack_multiplier);
      this.add_to_log({
        turn: "m",
        text: this.log_text.monster_attack + point,
      });
      this.player_heal -= point;
    },
    add_to_log: function (log) {
      this.logs.push(log);
    },
  },
  watch: {
    player_heal: function (value) {
      if (value <= 0) {
        this.player_heal = 0;
        let isConfirmed = confirm(
          "Oyunu KAYBETTİN. Tekrar denemek ister misin?"
        );

        if (isConfirmed) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      } else if (value >= 100) {
        this.player_heal = 100;
      }
    },
    monster_heal: function (value) {
      if (value <= 0) {
        this.monster_heal = 0;
        let isConfirmed = confirm(
          "Oyunu KAZANDIN! Tekrar denemek ister misin?"
        );

        if (isConfirmed) {
          this.player_heal = 100;
          this.monster_heal = 100;
          this.logs = [];
        }
      }
    },
  },
  computed: {
    player_progress: function () {
      return {
        width: this.player_heal + "%",
      };
    },
    monster_progress: function () {
      return {
        width: this.monster_heal + "%",
      };
    },
  },
});
