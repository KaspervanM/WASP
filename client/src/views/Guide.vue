<template>
  <div class="guide">
    <p class="header1" id="guide">Guide</p>
    <div class="body">
      <p class="header2">How WASP works</p>
      <p>
        WASP is a Web Application for Sharing processes. This means its intended
        use is for people to share their parallel processes online so that it
        can be run on other the devices of other people. This can, depending on
        the number of participants, decrease the time a program needs before it
        has completed.
      </p>
      <p>
        When you upload code to WASP, subtasks are created from it and stored.
        WASP keeps track of which subtasks have been completed, which are still
        in progress, and which have not yet been completed. When a person
        selects your task, a request is sent to the WASP servers. The servers
        then send the first available subtask. When the device of the person has
        finished the subtask, the sub result is sent to the server and added to
        the result accordingly.
      </p>
      <p>
        You should note that the subtasks have no form of intercommunication and
        the order in which the subtasks are executed is not set, some devices
        complete subtasks before others.
      </p>
      <p class="header2">Types of processes</p>
      <p class="header2">Creating a task (for the Requester)</p>
      <p>
        This is a guide for those that want to upload their code for others to
        help with.
      </p>
      <p class="header3">The form</p>
      <p>
        When you click on 'Add Task' on the sidebar, a form appears. This form
        contains five input fields with one, 'Task Configuration', already
        filled out. The first input is for the title. This is the first thing
        people will see when they search for tasks. There is a limit on how long
        you can make the title: 40 characters. Next to it, you must enter a
        password. This password is used for deleting the task or, when the
        PUBLIC_RESULT configuration parameter is set to false and the task has
        finished, it is used to request the result.
      </p>
      <p>
        Below the title input box is the task description. This should contain
        an explanation of what the program does and why people should help it.
        Next to the description input box, you can find the task configuration.
        This is an important part of adding tasks. More information about the
        configuration is found below.
      </p>
      <p>At the bottom, you can write your code or upload it.</p>
      <p class="header3" id="code">Acceptable code</p>
      <p>
        When you want to use this site to run your code on other people's
        devices, there are a few things you need to consider. Your code:
      </p>
      <ul>
        <li>must be written in JavaScript.</li>
        <li>
          must contain a 'main' function. This is the function that will be
          called, and its start and end value will be passed, respectively.
        </li>
        <li>
          mustn't contain the following keywords:
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
        <li>will not be shown to any user of the site.</li>
      </ul>
      <p class="header3">Configuration settings</p>
      <p>When you enter the configuration input box, a tooltip appears.</p>
      <div>
        <pre>
{
  "START": 0 | 1 | 2 | 3 | ...;
  "END": START + 0 | 1 | 2 | 3 | ...;
  "BATCH_SIZE": 1 | 2 | 3 | ...;
  "RESULT": "sum" | "bigsum" | "string" | "array";
  "PUBLIC_RESULT": true | false;
  "REQ_TIMEOUT": 0 | 1 | 2 | 3 | ... (in seconds);
}</pre
        >
      </div>
      <p>
        The first element is START; this contains the first value sent to the
        subtask. The second element is END; this contains the last value sent to
        the subtask. The third element is the BATH_SIZE; this is the amount of
        subtasks that is sent to a user at once. The subtasks divide the total
        number of iterations into equal batch sizes. The fourth element is
        RESULT; this determines how the sub results should be stored in the
        server.
      </p>
      <p class="header3">What to consider?</p>
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
