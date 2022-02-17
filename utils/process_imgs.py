import base64
from io import BytesIO
import json
from pathlib import Path
from PIL import Image
import re
import requests
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def get_resized_img(browser, img_path, resize_percent):
    browser.get("https://products.aspose.app/imaging/image-resize/")

    size = browser.find_element_by_class_name("settings-number-edit")
    size.send_keys(Keys.BACK_SPACE, Keys.BACK_SPACE, Keys.BACK_SPACE)
    size.send_keys(str(resize_percent))

    format_button = browser.find_element_by_id("btnSaveAs")
    format_button.click()
    format = browser.find_element_by_css_selector(
        ".aspose-dropdown-editor:not(.hidden)"
    )
    format.send_keys("PNG", Keys.ARROW_DOWN, Keys.RETURN)

    file_input = browser.find_element_by_css_selector(".filedrop > input[type=file]")
    file_input.send_keys(str(img_path))

    resize = WebDriverWait(browser, 100).until(
        EC.element_to_be_clickable((By.ID, "workButton"))
    )
    resize.click()

    download = WebDriverWait(browser, 100).until(
        EC.element_to_be_clickable((By.ID, "DownloadButton"))
    )
    download_link = download.get_attribute("href")

    r = requests.get(download_link)

    return BytesIO(r.content)


def remove_blank_space(img_bytes_io):
    with Image.open(img_bytes_io) as opened_img:
        width, height = opened_img.size

        # get boundaries of actual image
        min_width = float("inf")
        min_height = float("inf")
        max_width = float("-inf")
        max_height = float("-inf")
        for i in range(width):
            for j in range(height):
                if opened_img.getpixel((i, j))[3] != 0:
                    if i < min_width:
                        min_width = i
                    if i > max_width:
                        max_width = i
                    if j < min_height:
                        min_height = j
                    if j > max_height:
                        max_height = j

        cropped = opened_img.crop((min_width, min_height, max_width, max_height))

        new_file = BytesIO()
        cropped.save(new_file, format="png")

    return new_file


def encode_to_base64(img_bytes_io):
    encoded = base64.b64encode(img_bytes_io.getvalue())
    return encoded.decode("ascii")


if __name__ == "__main__":
    inputs = Path("C:/Users/Adam/Desktop/itens")

    browser = webdriver.Firefox(
        executable_path=r"C:\geckodriver-v0.30.0-win64\geckodriver.exe"
    )

    items = {}

    for file in inputs.iterdir():
        try:
            match = re.fullmatch(r"Trinket_(.*?)_icon", file.stem)
            name = match[1] if match is not None else file.stem

            resized = get_resized_img(browser, file, 200)
            # cropped = remove_blank_space(resized)

            # with open(file, "rb") as f:
            #     bites = BytesIO(f.read())

            b64 = encode_to_base64(resized)

            print(f"Encoded {name}.")

            items[name] = b64
        finally:
            with open(
                r"E:\programowanie\projekty\utrzymywane\platynowy-bog\datad.json", "w"
            ) as f:
                json.dump(items, f)
