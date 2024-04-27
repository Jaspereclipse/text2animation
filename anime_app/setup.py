from setuptools import find_packages, setup

setup(
    name="anime_app",
    include_package_data=True,
    python_requires='>=3.8.13',
    install_requires=[
        'numpy==1.24.4',
        'scipy==1.10.0',
        'scikit-image==0.19.3',
        'scikit-learn==1.1.2',
        'shapely==1.8.5.post1',
        'opencv-python==4.6.0.66',
        'Pillow==10.1.0',
        'glfw==2.5.5',
        'PyOpenGL==3.1.6',
        'PyYAML==6.0.1',
        'requests==2.31.0',
        'torchserve==0.7.0',
        'tqdm==4.64.1',
        'Flask==2.3.2',
        'flask-cors==4.0.0'
    ],
    packages=find_packages(),
)