# Developer quickstart

```python title ="Make your 1st OpenAI API request in minutes.
 Learn the basics of the OpenAI platform.
 " linenums="5" hl_lines="7-15"

from openai import OpenAI
client = OpenAI()

response = client.responses.create(
    model="gpt-5.5",
    input="Write a short bedtime story about a unicorn."
)

print(response.output_text)
```

```python title ="Make your 1st Gemini AI API request in minutes.
" linenums="19" hl_lines="23-30"

from google import genai

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.5-flash",
    contents="Explain how AI works in a few words",
)

print(response.text)
```

# Function to add two numbers

```python title="add_numbers.py" linenums="1" hl_lines="17-18"
def add_two_numbers(num1, num2):
    return num1 + num2


# Example usage

result = add_two_numbers(5, 3)
print("The sum is:", result)
```

```py title="add_numbers.py" linenums="1" hl_lines="7-8"
# Function to add two numbers
def add_two_numbers(num1, num2):
    return num1 + num2


# Example usage
result = add_two_numbers(5, 3)
print("The sum is:", result)
```
