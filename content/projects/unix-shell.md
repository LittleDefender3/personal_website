# Unix Shell with Client-Server Architecture

A custom Unix shell in pure C, including a server-client mode for cross-shell communication.

Built my own shell in Linux as part of my degree, written in pure C, including
a server-client architecture so shells can communicate with each other.

Forks child processes to run tasks concurrently, implements custom commands
that behave like their real shell counterparts, and passes through any
command without a custom definition so users can still access all standard
shell utilities (including full manual pages). Also supports running
commands simultaneously (&&) and storing/navigating command history.

Technologies: C, Unix, Systems Programming, Networking
