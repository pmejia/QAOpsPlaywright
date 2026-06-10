Feature: Ecommerce validations
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "abcdef.mejia@gmail.com" and "Learning@830$3mK2"
        When add "ZARA COAT 3" to Cart
        Then verify "ZARA COAT 3" is displayed in the Cart
        When Enter valid details and Place the order
        Then Verify order is present in the OrderHistory
    @validations
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify error message is displayed

        Examples:
        | username                  | password          |
        | abcdefg.mejia@gmail.com   | Learning@830$3mK2 |
        | hello@123.com             | Iam3455A          |