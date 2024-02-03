# Roulette-with-Enhanced-Random-Number-Generation


Roulette with Enhanced Random Number Generation is a simple multi-player game with an emphasis on creating a true randomly generated number. This project aims at creating a working prototype of a model which can generate a random number using environment variables such that the number generated is nearly impossible to predict. The need for this solution has risen due to the day-to-day increasing computational power and rise of quantum computers which using their ability can efficiently enhance the random number algorithms. This also gives rise to potential problems in some critical industries like security which can face consequences from the predictable nature of these random numbers. The aim of this project is to provide a solution to this problem by involving the random nature around us. These external factors can be of wide range and can have truly random values. 


Background: As humans are taking technological leaps, there has been a side effect, which is increasing cybercrimes. These cyber-criminals take advantage of the power of these technological advancements to break existing algorithms and infrastructure. This fuelled the need for this project, to create a system which can totally be independent of predictability, which we can leverage to create systems which by nature are random. This randomness can prevent cybercrimes and help create robust systems. Sometimes, it is possible to detect that a pseudorandom number generator (PRNG) does not generate really random numbers by using bitmaps. For example, the following picture shows a bitmap created by using numbers generated by the well-known weak function Rand() (PHP 5.4.7 / Windows XP). An obvious pattern can be noticed so it can be deduced that the generated numbers could be predicted. 


Objectives 
The main objectives of this project are:
1. To generate a true random by leveraging the external environment.
2. To leverage quantum computing to create a robust external system to enhance number generation. Methodology The methodology used is as follows:
3. The first step was to create a base application in which we could use random numbers for which we chose the game of Roulette.
4. The next step was to find such events in nature which are random and can be incorporated into our application.
5. After identifying these events, such events were selected from which a number could be generated.
6. Using multiple such events bitwise XOR is applied to all these numbers to come to a final random number or the seed.
7. This seed is used to select a quantum computer for further number generation and the final number is given out by the quantum computer. Limitations: The limitation that this project faces is time. The system takes about 20-30 seconds to generate the random using the external variables. This amount of time can be critical in some use cases where the quickness of an algorithm is demanded.
