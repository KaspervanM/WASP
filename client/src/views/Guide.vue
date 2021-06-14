<template>
  <div class="guide">
    <p class="header1">Guide</p>
    <div class="body">
      <p class="header2">How WASP works</p>
      <p>
        WASP is a Web Application For Sharing processes. This means its intended
        use is for people to share their parallel processes online so that it
        can be run on other the devices of other people. This can, depending on
        the amount of participants, decrease the time a program needs before it
        has completed.
      </p>
      <p>
        When you upload code to WASP, subtasks are created from it and stored.
        WASP keeps track of which subtasks have been completed, which are still
        in progress and which have not yet been completed. When a person selects
        your task, a request is sent to the WASP servers. The servers then send
        the first available subtask. When the device of the person has finished
        the subtask, the result is sent to the server and added to the end
        result accordingly.
      </p>
      <p>
        You should note that the subtasks have no form of intercommunication and
        also the order in which the subtasks are excecuted is not set; some
        devices complete subtasks before others.
      </p>
      <p class="header2">Types of processes</p>
      <p class="header2">Creating a task (for the Requester)</p>
      <p>
        This is a guide for those that want to upload their code for others to
        help with.
      </p>
      <p class="header3">Upload code</p>
      <p></p>
      <p class="header3">Acceptable code</p>
      <p>
        When you want to use this site to run your code on other people's
        devices, there are a few things you need to consider. Your code must:
      </p>
      <ul>
        <li>be written in Javascript.</li>
        <li>
          contain a 'main' function with two parameters. This is the function
          that will be called and its start and end value will be passed
          respectively.
        </li>
        <li>
          not contain the following keywords:
          <ul>
            <li>window</li>
            <li>document</li>
            <li>console</li>
            <li>alert</li>
            <li>prompt</li>
            <li>confirm</li>
            <li>eval</li>
            <li>import</li>
            <li>export</li>
            <li>XMLHttpRequest</li>
            <li>fetch</li>
          </ul>
        </li>
      </ul>
      <p class="header3">Configuration settings</p>
      <p class="header3">What to take into account</p>
      <p class="header2">Contributing to a task (for the Helper)</p>
      <p>
        This is a guide for those that want to contribute to a task for other
        Requesters.
      </p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.guide {
  width: 100%;
  height: auto;
  text-align: left;
}
.body {
  width: 80%;
  height: auto;
  display: flex;
  flex-flow: column;
  margin-left: 8%;
}
.header2 {
  margin-left: -5%;
}
.header3 {
  margin-left: -2.5%;
}
</style>
