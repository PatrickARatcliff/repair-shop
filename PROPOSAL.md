# DEV10 Capstone Proposal: Repair-Shop / /repair-shop


## About / Synopsis

* Construct an application to schedule service appointment at a car repair shop. View, add, edit, and delete appointments, customers, cars, appointments, and users.

Links:

* <https://github.com/PatrickARatcliff/repair-shop>
* <https://dev-10.teachable.com/courses/java-fundamentals-academy-2023/lectures/48330729>


## Table of Contents
<div id = "user-content-toc">
    <ul> 
        <li><a href="#dev10-capstone-proposal-repair-shop--repair-shop">Title / Repository Name</a></li>
            <ul>   
                <li><a href="#about--synopsis">About / Synopsis</a></li>
                <li><a href="#overview">High-level Requirements</a></li>
                      <ul>
                        <li><a href="#api">API</a></li>
                          <ul>
                            <li><a href="#sql">SQL</a></li>
                            <li><a href="#java">Java</a></li>
                          </ul>
                        <li><a href="#ui">UI</a></li>
                          <ul>
                            <li><a href="#basic-ui-structure">Basic UI Structure</a></li>
                              <ul>
                                <li><a href="#navbar">NavBar</a></li>
                                <li><a href="#landing-page">Landing Page</a></li>
                                <li><a href="#calendar-page">Calendar Page</a></li>
                                <li><a href="#appointment-detail-page">Appointment Detail Page</a></li>
                                <li><a href="#customer-detail-page">Customer Detail Page</a></li>
                                <li><a href="#car-detail-page">Car Detail Page</a></li>
                              </ul>
                          </ul>
                      </ul>
                <li><a href="#learning-goal">Learning Goals</a></li>
                  <ul>
                    <li><a href="#typescript">TypeScript</a></li>
                    <li><a href="#fullcalendar">Full Calendar</a></li>
                  </ul>
            </ul>
    </ul>
</div>


## Overview

### API

#### SQL

Using SQL create Schema and insert data for `Appointments`, `Customers`, `Cars`, and `Users`. `Appointments` have one `User`, one `Car`, and by extension one `Customer`. `Customers` have many many `Cars`.  `Cars` have many `Appointments`, one `Customer`. `Users` have many `Appointments`.

#### Java

Using Java, create an API to `view`, `add`, `edit`, and `delete` `Appointments`, `Customers`, `Cars`, `Appointments`, and `Users`. Security will be used to discern between `USER` and `ADMIN` for customer, car deleting operations. `ADMIN` will be able to manage Users

### UI

The UI will be constructed with React and employ `TypeScript` and employ `FullCalendar.io` for presenting appointments. 

`Users` will be able to `create`, `edit`, and `delete` `Appointments`, as well as `add` and `edit` `Customers`/`Cars`.

`Admin` will be able to `create`, `edit`, and `delete` `Appointments`; `add`, `edit`, `delete` `Customers`/`Cars`/`Users`.

#### Basic UI Structure

##### NavBar
  - Brand
  - NavLinks
  - Username Display
  - Login/Logout Links

##### Landing Page
  - Welcome message
  - Super pretty image

##### Calendar Page
  - View appointments via calendar
  - Links to appointment detail page for each displayed appointment
  - Modal to add appointment

##### Appointment Detail Page
  - Appointment detail display
  - Delete button w/ confirm modal
  - Edit accordian/drawer with form

##### Customer Detail Page
  - Customer detail display
  - Delete button w/ confirm modal
  - Edit accordian/drawer with form
  - Link to car detail page

##### Car Detail Page
  - Car detail display
  - Delete button w/ confirm modal
  - Edit accordian/drawer with form

## Learning Goals

### TypeScript

Employing the resources below, I will spend the weekend familiarizing myself with `TypeScript` and how to use it with `React` and `FullCalendar`.

* <https://www.typescriptlang.org/docs/handbook/intro.html>

* <https://react.dev/learn/typescript>

### FullCalendar

Employing the resource below, I will spend the weekend familiarizing myself with `FullCalendar.io` and how to use it with `React` and `TypeScript`.

* <https://fullcalendar.io/>


<br><hr>
<a href="#dev10-capstone-proposal-repair-shop--repair-shop">🔼 Back to top</a>