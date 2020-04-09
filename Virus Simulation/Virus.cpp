#include <iostream>
#include <cmath>
#include <string>
#include <array>
#include <vector>
#include <algorithm>
#include <random>
#include <ctime>
#include <iterator>
#include <utility>
#include <typeinfo>
#include <chrono>
#include <fstream>
#include <cstring>
#include <math.h>
#include <map>

namespace mut
{
    double r_value{ 3.2 };
    int isolation_infect_reduction{ 4 };
    int symptom_isolation{ 1 };
    int start_infected{ 100 };
    int lockdown_days{ 28 };
    int time_steps = 400;

}

std::uniform_real_distribution<double> double_num(0.0, 1.0);

std::normal_distribution<float> incubation(6, 1.5);

std::normal_distribution<float> infection_period(15, 2);



auto seed = std::chrono::high_resolution_clock::now().time_since_epoch().count();
std::mt19937 mersenne(static_cast<std::mt19937::result_type>(seed));

int generate_random_int(const int min, const int max)
{
    std::uniform_int_distribution<> num(min, max);
    int prob = num(mersenne);
    return prob;
}

class person
{
    int m_age{};
    bool m_immune{};
    int m_incubation{};
    int m_infected_days{};
    int m_death_day{};
    int day{};
    bool infected{};
    double infect_chance{};
    int finish{};
    bool step_check{};

public:

    void set_person(int age, bool immune)
    {
        m_age = age;
        m_immune = immune;
    }

    void when_infected(bool infector, int incubation, int infected_days, int death_day)
    {
        infected = infector;
        m_incubation = incubation;
        m_infected_days = infected_days;
        m_death_day = death_day;
        infect_chance = mut::r_value / (static_cast<double>(m_incubation) + static_cast<double>(m_infected_days));
        finish = incubation + infected_days;
        step_check = false;
        
    }

    bool is_step()
    {
        return step_check;
    }

    void step_through()
    {
        step_check = true;
    }

    void make_immune()
    {
        m_immune = true;
    }

    int get_incubation()
    {
        return m_incubation;
    }

    void add_day()
    {
        ++day;
    }

    int get_finish()
    {
        return finish;
    }

    double get_infect_chance()
    {
        return infect_chance;
    }

    int get_infected_days()
    {
        return m_infected_days;
    }

    bool get_infected()
    {
        return infected;
    }

    int get_day()
    {
        return day;
    }

    int get_death_day()
    {
        return m_death_day;
    }

    int get_age()
    {
        return m_age;
    }

    bool get_immune()
    {
        return m_immune;
    }

};


class dead
{
    std::vector<person> m_dead;

public:

    void add_dead(person person)
    {
        m_dead.push_back(person);
    }

    int deaths()
    {
        return m_dead.size();
    }

};


double death_chance(int age)
{
    switch (age)
    {
    case 1:
        return 0.00005;
    case 2:
        return 0.0002;
    case 3:
        return 0.001;
    case 4:
        return 0.004;
    case 5:
        return 0.015;
    case 6:
        return 0.055;
    default:
        std::cout << "ERROR" << std::endl;
        return 0;
    }
}

///age brackets: 0-14, 15-24, 25-54, 55-64, 65-80, 81+

void get_statistics(std::vector<person> m_population, dead dead_list, int days)
{
    int total_dead = dead_list.deaths();
    int total_immune{};
    int uninfected{};
    int infected{};
    int total_alive = m_population.size();

    for (person& i : m_population)
    {
        if (i.get_immune() == true)
            ++total_immune;

        if (i.get_immune() == false && i.get_infected() == false)
            ++uninfected;

        if (i.get_immune() == false && i.get_infected() == true)
            ++infected;
    }

    std::cout << "Days Done   Alive         Infected       Uninfected    Recovered     Dead"
        << "\n" << days << "            " << total_alive << "         " << infected << "          " << uninfected << "         " << total_immune << "       " << total_dead << "\n\n" << std::endl;


    std::ofstream outfile;
    outfile.open("35 LD 3 day SI.txt", std::ios::app);
    outfile << days << "   " << uninfected << "   " << infected << "   " << total_immune << "   " << total_dead << std::endl;
    outfile.close();
}



class population
{
    std::vector<person> m_population;
    dead dead_list;

public:

    void set_population(std::vector<person> population)
    {
        m_population = population;
    }

    std::vector<person> get_population()
    {
        return m_population;
    }

    void spread()
    {
        int days_done = 0;
        while (days_done < mut::time_steps)
        {
            int x = m_population.size();

            for (int i = 0; i < x; ++i)
            {
                if (m_population.at(i).get_immune() == false && m_population.at(i).get_infected() == true)
                {
                    m_population.at(i).step_through();
                }
                
                
                if (m_population.at(i).get_day() == m_population.at(i).get_death_day() && m_population.at(i).get_death_day() != 0)
                {
                    dead_list.add_dead(m_population.at(i));
                    m_population.erase(m_population.begin() + i);
                    --i;
                    --x;
                }
            }
            x = m_population.size();
            for (int i = 0; i < x; ++i)
            {
                if (m_population.at(i).get_infected() == true && m_population.at(i).get_immune() == false && m_population.at(i).is_step() == true)
                {
                    if (m_population.at(i).get_day() < m_population.at(i).get_incubation() + mut::symptom_isolation)
                    {

                        double infect_chance = m_population.at(i).get_infect_chance();
                        if (days_done > 14 && days_done < mut::lockdown_days)
                            infect_chance = infect_chance / mut::isolation_infect_reduction;
                        double generator = double_num(mersenne);
                        if (generator < infect_chance)
                        {
                            int to_infect = generate_random_int(0, m_population.size() - 1);
                            if (m_population.at(to_infect).get_immune() == false && m_population.at(to_infect).get_infected() == false)
                            {
                                int incubation_days = (int)round(incubation(mersenne));
                                if (incubation_days < 2)
                                    incubation_days = 2;
                                if (incubation_days > 10)
                                    incubation_days = 10;
                                int infected_days = (int)round(infection_period(mersenne));
                                if (infected_days < 10)
                                    infected_days = 10;
                                if (infected_days > 20)
                                    infected_days = 20;


                                double death = death_chance(m_population.at(to_infect).get_age());
                                double will_die = double_num(mersenne);
                                int death_day{};
                                if (will_die < death)
                                {
                                    death_day = generate_random_int(incubation_days + 1, incubation_days + infected_days);
                                }
                                else
                                {
                                    death_day = -1;
                                }
                                m_population.at(to_infect).when_infected(true, incubation_days, infected_days, death_day);
                            }
                        }
                    }
                    if (m_population.at(i).get_day() >= m_population.at(i).get_finish())
                    {
                        m_population.at(i).make_immune();
                    }
                    else
                    {
                        m_population.at(i).add_day();
                    }
                }
            }

            if (days_done % 2 == 0)
                get_statistics(m_population, dead_list, days_done);

            ++days_done;
        }
    }

    void start_infected(int number)
    {
        for (int i = 0; i < number; ++i)
        {
            int to_infect = generate_random_int(0, m_population.size());
            if (m_population.at(to_infect).get_immune() == false && m_population.at(to_infect).get_infected() == false)
            {
                int incubation_days = (int)round(incubation(mersenne));
                if (incubation_days < 2)
                    incubation_days = 2;
                if (incubation_days > 10)
                    incubation_days = 10;
                int infected_days = (int)round(infection_period(mersenne));
                if (infected_days < 10)
                    infected_days = 10;
                if (infected_days > 20)
                    infected_days = 20;
                double death = death_chance(m_population.at(to_infect).get_age());
                double will_die = double_num(mersenne);
                int death_day{};
                if (will_die < death)
                {
                    death_day = generate_random_int(incubation_days + 1, incubation_days + infected_days);
                }
                else
                {
                    death_day = -1;
                }
                m_population.at(i).when_infected(true, incubation_days, infected_days, death_day);
            }
        }
    }

};



int main()
{
    std::ofstream outfile;
    outfile.open("35 LD 3 day SI", std::ios::app);
    outfile << "Days" << "  " << "Uninfected" << "  " << "Infected" << "  " << "Recovered" << "  " << "Deaths" << std::endl;
    outfile.close();
    
    std::vector<person> pop;
    person one;
    person two;
    person three;
    person four;
    person five;
    person six;
    one.set_person(1, 0);
    two.set_person(2, 0);
    three.set_person(3, 0);
    four.set_person(4, 0);
    five.set_person(5, 0);
    six.set_person(6, 0);

    std::cout << "HERE" << std::endl;
    for (long i = 0; i < 4600000; ++i)
    {

        if (i < 902520)
            pop.push_back(one);

        if (i > 902520 && i < 1507880)
            pop.push_back(two);

        if (i > 1507880 && i < 3328560)
            pop.push_back(three);

        if (i > 3328560 && i < 3883320)
            pop.push_back(four);

        if (i > 3883320 && i < 4241430)
            pop.push_back(five);

        if (i > 4241430 && i < 4600000)
            pop.push_back(six);
    }
    std::cout << "HERE" << std::endl;

    population new_zealand;
    new_zealand.set_population(pop);
    new_zealand.start_infected(mut::start_infected);
    std::cout << "HERE" << std::endl;
    new_zealand.spread();


}





