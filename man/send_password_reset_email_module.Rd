% Generated by roxygen2: do not edit by hand
% Please edit documentation in R/send_password_reset_email_module.R
\name{send_password_reset_email_module}
\alias{send_password_reset_email_module}
\title{server logic for Shiny module to send a password reset email}
\usage{
send_password_reset_email_module(input, output, session, email)
}
\arguments{
\item{input}{the Shiny server input}

\item{output}{the Shiny server output}

\item{session}{the Shiny server session}

\item{email}{A reactive value returning the email address to send the password
reset email to.}
}
\description{
This function sends s request to the polished.tech API to reset a user's
password.
}
