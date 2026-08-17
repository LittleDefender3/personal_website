# Custom Game Engine (OpenGL & C++)

From-scratch game engine applying proper design patterns for rendering, physics & input.

Developed a game engine from scratch to demonstrate skills built up across my
degree — applying design patterns like Façade to hide how physics, rendering,
input management, AI movement and animation all work under the hood, so any
piece (e.g. swapping OpenGL for Vulkan) can be replaced without touching the
rest of the engine.

Exposes a Lua scripting layer so engine users just create entities and attach
components — e.g. a player gets a mesh, material, box collider and transform
component — giving game developers maximum freedom without ever touching the
engine's source code.

Technologies: C++, OpenGL, Lua, Design Patterns
