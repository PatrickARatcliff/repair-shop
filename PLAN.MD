# Capstone: Repair-Shop / /repair-shop


## About / Synopsis

* Construct an application to schedule service appointment at a car repair shop. View, add, edit, and delete appointments, customers, cars, and users.

Links:

* <https://github.com/PatrickARatcliff/repair-shop>
* <https://dev-10.teachable.com/courses/java-fundamentals-academy-2023/lectures/48330729>

### API Wire-Frame
![api-wireframe.jpeg](/api-wireframe.jpeg)

### UI Wire-Frame
![ui-wireframe.jpeg](/ui-wireframe.jpeg)

## Table of Contents
<div id = "user-content-toc">
    <ul> 
        <li><a href="#capstone-repair-shop--repair-shop">Title / Repository Name</a></li>
            <ul>   
                <li><a href="#about--synopsis">About / Synopsis</a></li>
                <li><a href="#technical-requirements">Technical Requirements</a></li>
                <li><a href="#learning-goals">Learning Goals</a></li>
                    <ul>
                        <li><a href="#typescript">TypeScript</a></li>
                        <li><a href="#fullcalendar">Full Calendar</a></li>
                    </ul>
                <li><a href="#user-stories">User Stories</a></li>
                    <ul>
                        <li><a href="#appointment-stories">Appointment Stories</a></li>
                        <li><a href="#customer-stories">Customer Stories</a></li>
                        <li><a href="#vehicle-stories">Vehicle Stories</a></li>
                        <li><a href="#app-user-stories">App User Stories</a></li>
                    </ul>
                <li><a href="#overview">Overview</a></li>
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
                                <li><a href="#vehicle-detail-page">Vehicle Detail Page</a></li>
                              </ul>
                          </ul>
                    </ul>
                <li><a href="#my-plan-of-action">My Plan of Action</a></li>
                    <ul>
                        <li><a href="#api-checklist">API Checklist</a></li>
                            <ul>
                                <li><a href="#sql-schema">SQL Schema</a></li>
                                <li><a href="#models">Models</a></li>
                                <li><a href="#data-layer">Data Layer</a></li>
                                <li><a href="#domain-layer">Domain Layer </a></li>
                                <li><a href="#api-controllers">API Controllers</a></li>
                                <li><a href="#api-security">API Security</a></li>
                                <li><a href="#http-requests">HTTP Requests</a></li>
                            </ul>
                        <li><a href="#ui-checklist">UI Checklist</a></li>
                            <ul>
                                <li><a href="#ui-services">UI Services</a></li>
                                <li><a href="#styles">Styles</a></li>
                                <li><a href="#pages">Data Layer</a></li>
                                <li><a href="#router">Router</a></li>
                                <li><a href="#components">Components</a></li>
                            </ul>
                    </ul>
                <li><a href="#stretch-goals">Stretch Goals</a></li>
            </ul>
    </ul>
</div>


## Technical Requirements

Unless it's modified by a learning goal (see below), the following are strict technical requirements.

1. Manage 4-7 database tables (entities) that are independent concepts. A simple bridge table doesn't count.
2. Relational database for data management
3. Spring Boot, MVC (@RestController), JdbcTemplate, Testing
4. An HTML and CSS UI built with React
5. Sensible layering and pattern choices
6. A full test suite that covers the domain and data layers.

## Learning Goals

### TypeScript

 `TypeScript` and use with `React` and `FullCalendar`.

* <https://www.typescriptlang.org/docs/handbook/intro.html>

* <https://react.dev/learn/typescript>

### FullCalendar

`FullCalendar.io` and use with `React` and `TypeScript`.

* <https://fullcalendar.io/>


## User Stories

### Appointment Stories

- As an authenticated `USER` or `ADMIN` I want to be able to to `view` existing `Appointment`s via a Calendar

- As an authenticated `USER` or `ADMIN` I want to be able to `create` new and `edit` `Appointment`s with a simple form

    +       Manage relationships between `Appointment` and `Vehicles

- As an authenticated `USER` or `ADMIN` I want to be able to `delete` `Appointment`s with a confirmation prompt

- As an authenticated `USER` or `ADMIN` I want to be able to `view` `Appointment`s for a `Customer` or `Vehicle`

### Customer Stories

- As an authenticated `USER` or `ADMIN` I want to be able to `view`, `add` new and `edit` `Customer`'s with a simple form

    +       Manage relationships between `Customer` and `Vehicle`

- As an authenticated `ADMIN` I want to be able to `delete` `Customer`'s with a confirmation prompt

### Vehicle Stories

- As an Authenticated `USER` or `ADMIN` I want to be able to `view`, `add` new and `edit` vehicles for a `Customer` with a simple form

    +       Manage relationships between `Vehicle` and `Customer`

- As an authenticated `ADMIN` I want to be able to `delete` `Vehicle`'s with a confirmation prompt

### App User Stories

- As an authenticated `ADMIN` I want to be able to `view`, `add`, and `edit` app `USER`s

- As an authenticated `ADMIN` I want to be able to `delete` app `USER`s with a confirmation prompt

## Overview

### API
<a href="#api-wire-frame">🔼 View Wire-Frame</a>

#### SQL

Using SQL create Schema and insert data for `Appointment`s, `Customer`s, `Vehicle`s, and `User`s. `Appointment`s have one `User`, one `Vehicle`, and by extension one `Customer`. `Customer`s have many many `Vehicle`s.  `Vehicle`s have many `Appointment`s, one `Customer`. `User`s have many `Appointment`s.

#### Java

Using Java, create an API to `view`, `add`, `edit`, and `delete` `Appointment`s, `Customer`s, `Vehicle`s, `Appointment`s, and `User`s. Security will be used to discern between `USER` and `ADMIN` for customer, car deleting operations. `ADMIN` will be able to manage Users

### UI
<a href="#ui-wire-frame">🔼 View Wire-Frame</a>

The UI will be constructed with React and employ `TypeScript` and employ `FullCalendar.io` for presenting appointments. 

`User`s will be able to `create`, `edit`, and `delete` `Appointment`s, as well as `add` and `edit` `Customer`s/`Vehicle`s.

`Admin` will be able to `create`, `edit`, and `delete` `Appointment`s; `add`, `edit`, `delete` `Customer`s/`Car`s/`User`s.

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
  - Link to vehicle detail page

##### Vehicle Detail Page
  - Vehicle detail display
  - Delete button w/ confirm modal
  - Edit accordian/drawer with form
  - Link to customer detail page

##### Customer Detail Page
  - Customer detail display
  - Delete button w/ confirm modal
  - Edit accordian/drawer with form


## My Plan of Action

### API Checklist

#### [ ] SQL Schema (8 Hours Total)

##### [ ] Create Production Schema (4.0 hours)

- `Appointment`
    +       one-to-one `Vehicle`
    +       one-to-one `User`

- `Vehicle`
    +       one-to-many `Appointment`
    +       many-to-one `Customer`

- `Customer`
    +       one-to-many `Vehicle`

- `User`
    +       one-to-many `Appointment`

* Create data for `insert`
* Craft CRUD queries for all tables (for Data Mappers)

##### [ ] Create Test Schema (2.0 Hours)

- Duplicate Production Schema

- Create `KnownGoodState` procedure

#### [ ]  Create Models (2.0 Hours Total)

```java
public class Appointment{
    private int appointmentId;
    private Date appointmentDate;
    private int vehicleId;
}
```

```java
public class Vehicle{
    private int vehicleId;
    private String vehicleMake;
    private String vehicleModel;
    private Date vehicleYear;
    private int customerId;
}
```

```java
public class Customer{
    private int customerId;
    private String customerFirstName;
    private String customerLastName;
    private String customerPhone;
    private String customerEmail;
    private boolean important;
}
```

```java
public class User implements UserDetails {
    private int userId;
    private String username;
    private String password;
    private boolean enabled;
    Private List<SimpleGrantedAuthority> authorities = new ArrayList<>();
}
```

#### [ ] Data Layer (12.0 Hours Total)

    [ ] `AppointmentJdbcTemplateRepository` and `AppointmentMapper` (2.0 Hours)
    [ ] `VehicleJdbcTemplateRepository` and `VehicleMapper` (2.0 Hours)
    [ ] `CustomerJdbcTemplateRepository` and `CustomerMapper` (2.0 Hours)
    [ ] `UserdbcTemplateRepository` and `UserMapper` (2.0 Hours)
    [ ] Create tests for above repositories; Create `KnownGoodState` class (4.0 Hours)

#### [ ] Domain Layer (8.0 Hours Total)

    [ ] Create `Result` class; Create `Validation` class (2.0 Hours)
    [ ] Create `AppointmentService` (1.0 Hours)
    [ ] Create `VehicleService` (1.0 Hours)
    [ ] Create `CustomerService` (1.0 Hours)
    [ ] Create `UserService` in `security` (1.0 Hours)
    [ ] Create tests for above services; (2.0 Hours)

#### [ ] API Controllers (5.0 Hours Total)

    [ ] Create `GlobalErrHandler` class (1.0 Hours)
    [ ] Create `AppointmentController` (1.0 Hours)
    [ ] Create `VehicleController` (1.0 Hours)
    [ ] Create `CustomerController` (1.0 Hours)
    [ ] Create `UserController` (1.0 Hours)

#### [ ] API Security (3.0 Hours Total)

    [ ] Create `SecurityConfig` class (1.0 Hours)
    [ ] Create `JwtConverter` class (1.0 Hours)
    [ ] Create `JwtRequestFilter` class (1.0 Hours)

#### [ ] HTTP Requests (2.0 Hours Total)

    [ ] Create `appointment.http` (0.5 Hours)
    [ ] Create `vehicle.http` (0.5 Hours)
    [ ] Create `customer.http` (0.5 Hours)
    [ ] Create `user.http` (0.5 Hours)

### UI Checklist 

#### [ ] UI Services (4.0 Hours Total)

    [ ] Create `baseUrl` class (0.0 Hours)
    [ ] Create `appointmentService` (1.0 Hours)
    [ ] Create `vehicleService` (1.0 Hours)
    [ ] Create `customerService` (1.0 Hours)
    [ ] Create `userService` (1.0 Hours)

#### [ ] Styles (1.0 Hours Total)

    [ ] `<link> bootstrap cdn`
    [ ] `import react-bootstrap`
    [ ] Create style sheets for all pages (and components if required)

#### [ ] Pages (12.0 Hours Total)

    [ ] Create `AuthProvider` class; wrap `App` in `AuthProvider` (1.0 Hours)
    [ ] Create `NavBar` (1.0 Hours)
    [ ] Create `Landing` page (1.0 Hours)
    [ ] Create `Calendar` page (1.0 Hours)
    [ ] Create `Appointment Detail` page (1.0 Hours)
    [ ] Create `Appointment Form` page (1.0 Hours)
    [ ] Create `Vehicle Detail` page (1.0 Hours)
    [ ] Create `Vehicle Form` page (1.0 Hours)
    [ ] Create `Customer Detail` page (1.0 Hours)
    [ ] Create `Customer Form` page (1.0 Hours)
    [ ] Create `User Detail` page (1.0 Hours)
    [ ] Create `User Form` page (1.0 Hours)

#### Router (1.0 Hours Total)

    [ ] Create Routes for above Pages (1.0 Hours)

#### [ ] Components (3.0 Hours Total)

    [ ] Sign-In/Out/Up Modal (2.0 Hours)
    [ ] `FormErrors` (0.25 Hours)
    [ ] `Appointment` card (0.25 Hours)
    [ ] `Vehicle` card (0.25 Hours)
    [ ] `Customer` card (0.25 Hours)


## Stretch Goals

### [ ] Integrate `Labor Items` full CRUD
### [ ] Refactor all UI forms into modals/accordians

<br><hr>
<a href="#capstone-repair-shop--repair-shop">🔼 Back to top</a>