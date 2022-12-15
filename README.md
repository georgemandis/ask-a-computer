# 🖥💬 Ask a computer!

Ask your computer natural-language questions about itself from the command line! Powereed by GPT-3 and reckless abandon.

🛑 **Caveat emptor:** This is dangerous! You probably shouldn't use this without a deep understanding of all the ways it could go wrong! I am not responsible for *anything* that breaks or goes wrong if you try to use this.

**Why it's dangerous**: This script will ask GPT-3 to generate a command-line script for your system and run it blindly. This is a _terrible_ idea—a proper production version of this should be carefully santiized and monitored.

**Update**: I've setup a project over at Glitch that you could remix and run remotely:
- https://glitch.com/edit/#!/ask-a-computer

That is _probably_ a little safer, though might be less sastifying and/or capable. Just change the `platform` variable to `"Ubuntu"`.

## What kind of questions can I ask?

That said... it works pretty well (in my experience) for questions like this:

- How much ram does this machine have?
- What type of monitor do I have connected?
- Tell me about my displays
- Tell me about this computer
- Which peripherals do I have connected right now?
- Which bluetooth devices are connected?
- What kind of machine am I running
- What is the operating system?
- What is my battery at?
- Do I need to charge my battery?
- Do I have any system updates waiting to be installed?
- How many packages did I install with brew?
- How many versions of nodejs do I have installed on this machine?
- What version of Python am I running?
- When was the last time I restarted this computer?
- How many process are running right now?
- Which ports are currently in use?
- Do I have __ installed on this machine?
- How much free memory do I have?
- How big is my hard drive and how much space do I have?
- Am I running any Docker containers right now?
- Am I running any nodejs processes right now?
- What process is using the most memory right now on my machine?


## Requirements:
- Node 19.1+
- An OpenAI account and API token stored as an environmental variable

## Getting started
- Run `npm install` or `yarn` from the project root
- Get an API token from OpenAI 
- Set the value for an environmental variale called `OPENAI_API_TOKEN` to this token
- **Important →** Update the `platform` variable in `index.js` to match your system (default is `macOS`)
- run `npm run start` or `yarn start` from the root folder. You can also run `debug` or `safe` to automatically pass in flags that will surface more logging and protect you from yourself.

### Flags
There are 2 flags that can be passed in:
- `--debug` will show helpful debugging information including raw responses from OpenAI, the command it tries to execute and more-detailed error messages
- `--dry-run` will request a command from OpenAI but not actually run it
