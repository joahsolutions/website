#

##

### Content Tabs

This is some examples of content tabs.

### Generic Content

=== "Plain text"

    This is some plain text

=== "Unordered list"

    * First item
    * Second item
    * Third item

=== "Ordered list"

    1. First item
    2. Second item
    3. Third item

### Code Blocks in Content Tabs

=== "Python"

    ```py
    def main():
        print("Hello world!")


    if __name__ == "__main__":
        main()
    ```

### Developer quickstart

```python title ="Make your 1st OpenAI API request in minutes.

 Learn the basics of the OpenAI platform.
 === "Python"
    ```py
    from openai import OpenAI
        client = OpenAI()

        response = client.responses.create(
            model="gpt-5.5",
            input="Write a short bedtime story about a unicorn."
        )

        print(response.output_text)
    ```
        
```python title ="Make your 1st Gemini AI API request in minutes.

Learn the basics of the Gemini AI platform.

    ```py
    from google import genai

        client = genai.Client()

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents="Explain how AI works in a few words",
        )

        print(response.text)
    ```

=== "JavaScript"

    ```js
    function main() {
        console.log("Hello world!");
    }

    main();
    ```
