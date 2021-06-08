<template>
  <div class="team">
    <p class="header1" id="title">Our Team</p>
    <b-container>
      <b-row id="row">
        <b-img
          rounded
          :src="require('@/assets/team/kasper.jpg')"
          alt="Kasper van Maasdam"
          fluid-grow
          id="img"
        ></b-img>
        <b-col id="info">
          <p class="header2" id="title">Kasper van Maasdam</p>
          <p id="text">
            Kasper van Maasdam is de Project Manager/Scrum Master. Hij is
            verantwoordelijk voor het eindproduct en voor een soepel verloop van
            het ontwikkelingsproces. Ook is het de taak van Kasper dat geen van
            zijn mede ontwikkelaars achterloopt wat betreft kennis over de
            nieuwe ontwikkelingsomgevingen.
          </p>
        </b-col>
      </b-row>
      <b-row id="row">
        <b-img
          rounded
          :src="require('@/assets/team/evan.jpg')"
          alt="Evan Pacini"
          fluid-grow
          id="img"
        ></b-img>
        <b-col id="info">
          <p class="header2" id="title">Evan Pacini</p>
          <p id="text">
            Evan Pacini is een teamlid. Zijn taak is om het project voort te
            laten gaan, door Agile mee te werken met zijn mede teamleden.
          </p>
        </b-col>
      </b-row>
      <b-row id="row">
        <b-img
          rounded
          :src="require('@/assets/team/luke.jpg')"
          alt="Luke Kuijpers"
          fluid-grow
          id="img"
        ></b-img>
        <b-col id="info">
          <p class="header2" id="title">Luke Kuijpers</p>
          <p id="text">
            Luke Kuijpers is ook een teamlid. Hij werkt samen met Kasper en Evan
            om dit een episch product te maken. 😎 Alhoewel hij minder ervaring
            heeft met programmeren zal hij zijn best doen om zijn steentje bij
            te dragen.
          </p>
        </b-col>
      </b-row>
      <b-row id="row">
        <b-img
          rounded
          :src="require('@/assets/team/dion.jpg')"
          alt="Dion van Dam"
          fluid-grow
          id="img"
        ></b-img>
        <b-col id="info">
          <p class="header2" id="title">Dion van Dam</p>
          <p id="text">
            Dion van Dam is de opdrachtgever en komt geregeld in contact met de
            rest van het team om het verloop van het project te bespreken. Hij
            is Scrum Master en is in dienst bij Atos. Hij doet op dit moment een
            opdracht voor het CIZ.
          </p>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<style lang="scss" scoped>
.team {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
}
#title {
  float: left;
  display: inline-flex;
}
#row {
  display: flex;
  flex-flow: row nowrap;
  margin: 10px;
  #img {
    max-width: 15vw;
  }
  #info {
    display: flex;
    flex-flow: column wrap;
    #text {
      text-align: left;
    }
  }
}
</style>
