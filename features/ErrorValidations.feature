Feature: Ecommerce2 validations
    @validations
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
        | username                  | password          |
        | abcdefg.mejia@gmail.com   | Learning@830$3mK2 |
        | hello@123.com             | Iam3455A          |